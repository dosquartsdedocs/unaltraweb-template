#!/usr/bin/env python3
"""Import Calibre book metadata into the unaltraweb _books collection.

The script is read-only by default. Pass --write to create Markdown files and
copy cover images. It never copies ebook files.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sqlite3
import unicodedata
from dataclasses import dataclass
from datetime import date
from pathlib import Path


LANGUAGE_NAMES = {
    "eng": "English",
    "en": "English",
    "spa": "Spanish",
    "es": "Spanish",
    "cat": "Catalan",
    "ca": "Catalan",
    "fre": "French",
    "fra": "French",
    "fr": "French",
    "ger": "German",
    "deu": "German",
    "de": "German",
    "ita": "Italian",
    "it": "Italian",
    "por": "Portuguese",
    "pt": "Portuguese",
    "rus": "Russian",
    "ru": "Russian",
}


@dataclass
class Book:
    calibre_id: int
    title: str
    authors: list[str]
    publisher: str | None
    series: str | None
    isbn: str | None
    doi: str | None
    pubdate: str | None
    path: str
    has_cover: bool
    tags: list[str]
    languages: list[str]


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value.lower()).strip("-")
    return slug or "book"


def yaml_scalar(value: object) -> str:
    return json.dumps(value, ensure_ascii=False)


def yaml_list(values: list[str]) -> str:
    if not values:
        return "[]"
    return "[" + ", ".join(yaml_scalar(value) for value in values) + "]"


def first_year(pubdate: str | None) -> int | None:
    if not pubdate:
        return None
    match = re.match(r"^(\d{4})", pubdate)
    if not match:
        return None
    year = int(match.group(1))
    if year <= 1:
        return None
    return year


def first_date(pubdate: str | None) -> str:
    if not pubdate:
        return str(date.today())
    match = re.match(r"^(\d{4})-(\d{2})-(\d{2})", pubdate)
    if match and int(match.group(1)) > 1:
        return match.group(0)
    year = first_year(pubdate)
    if year:
        return f"{year}-01-01"
    return str(date.today())


def language_label(codes: list[str]) -> str | None:
    labels = [LANGUAGE_NAMES.get(code, code) for code in codes if code]
    return ", ".join(labels) if labels else None


def connect_metadata(library: Path) -> sqlite3.Connection:
    db_path = library / "metadata.db"
    if not db_path.exists():
        raise SystemExit(f"No metadata.db found at {db_path}")
    uri = f"file:{db_path}?mode=ro"
    return sqlite3.connect(uri, uri=True)


def grouped_values(con: sqlite3.Connection, query: str) -> dict[int, list[str]]:
    grouped: dict[int, list[str]] = {}
    for book_id, value in con.execute(query):
        grouped.setdefault(book_id, []).append(value)
    return grouped


def load_books(library: Path) -> list[Book]:
    with connect_metadata(library) as con:
        authors = grouped_values(
            con,
            """
            select bal.book, authors.name
            from books_authors_link bal
            join authors on authors.id = bal.author
            order by bal.id
            """,
        )
        tags = grouped_values(
            con,
            """
            select btl.book, tags.name
            from books_tags_link btl
            join tags on tags.id = btl.tag
            order by tags.name
            """,
        )
        languages = grouped_values(
            con,
            """
            select bll.book, languages.lang_code
            from books_languages_link bll
            join languages on languages.id = bll.lang_code
            order by bll.item_order, bll.id
            """,
        )
        publishers = dict(
            con.execute(
                """
                select bpl.book, publishers.name
                from books_publishers_link bpl
                join publishers on publishers.id = bpl.publisher
                """
            )
        )
        series = dict(
            con.execute(
                """
                select bsl.book, series.name
                from books_series_link bsl
                join series on series.id = bsl.series
                """
            )
        )
        identifiers: dict[int, dict[str, str]] = {}
        for book_id, identifier_type, identifier_value in con.execute(
            """
            select book, lower(type), val
            from identifiers
            order by id
            """
        ):
            identifiers.setdefault(book_id, {})[identifier_type] = identifier_value

        books = []
        for row in con.execute(
            """
            select id, title, isbn, pubdate, path, has_cover
            from books
            order by title collate nocase
            """
        ):
            book_id, title, isbn, pubdate, path, has_cover = row
            book_identifiers = identifiers.get(book_id, {})
            books.append(
                Book(
                    calibre_id=book_id,
                    title=title,
                    authors=authors.get(book_id, []),
                    publisher=publishers.get(book_id),
                    series=series.get(book_id),
                    isbn=isbn or book_identifiers.get("isbn"),
                    doi=book_identifiers.get("doi"),
                    pubdate=pubdate,
                    path=path,
                    has_cover=bool(has_cover),
                    tags=tags.get(book_id, []),
                    languages=languages.get(book_id, []),
                )
            )
        return books


def existing_imports(books_dir: Path, source_key: str) -> set[int]:
    ids: set[int] = set()
    if not books_dir.exists():
        return ids
    pattern = re.compile(r"^calibre_id:\s*(\d+)\s*$", re.MULTILINE)
    source_pattern = re.compile(rf"^calibre_source:\s*{re.escape(source_key)}\s*$", re.MULTILINE)
    for path in books_dir.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        if not source_pattern.search(text):
            continue
        match = pattern.search(text)
        if match:
            ids.add(int(match.group(1)))
    return ids


def cover_source(library: Path, book: Book) -> Path | None:
    if not book.has_cover:
        return None
    path = library / book.path / "cover.jpg"
    return path if path.exists() else None


def normalized_title(value: str) -> str:
    return re.sub(r"\s+", " ", value.casefold()).strip()


def duplicate_title_groups(books: list[Book]) -> list[list[Book]]:
    grouped: dict[str, list[Book]] = {}
    for book in books:
        grouped.setdefault(normalized_title(book.title), []).append(book)
    return [group for group in grouped.values() if len(group) > 1]


def markdown_for_book(
    book: Book,
    *,
    source_key: str,
    collection_name: str,
    collection_ref: str | None,
    collection_labels: dict[str, str],
    profiles: list[str],
    lang: str,
    status: str,
    rating: int | float | None,
    cover_path: str | None,
) -> str:
    slug = f"calibre-{source_key}-{book.calibre_id}-{slugify(book.title)}"
    author = " & ".join(book.authors) if book.authors else None
    year = first_year(book.pubdate)
    book_language = language_label(book.languages)

    lines = [
        "---",
        "layout: book-review",
        f"lang: {lang}",
        f"ref: {slug}",
        f"profiles: {yaml_list(profiles)}",
        f"permalink: /{lang}/readings/{slug}/",
        f"title: {yaml_scalar(book.title)}",
        f"calibre_source: {source_key}",
        f"calibre_id: {book.calibre_id}",
        f"book_type: {yaml_scalar('Book')}",
        f"status: {status}",
        f"date: {first_date(book.pubdate)}",
    ]
    if collection_ref:
        lines.append(f"collection_ref: {yaml_scalar(collection_ref)}")
    lines.append(f"collection_name: {yaml_scalar(collection_name)}")
    for label_lang, label in collection_labels.items():
        lines.append(f"collection_{label_lang}: {yaml_scalar(label)}")
    if author:
        lines.append(f"author: {yaml_scalar(author)}")
    if book.publisher:
        lines.append(f"publisher: {yaml_scalar(book.publisher)}")
    if book.series:
        lines.append(f"series: {yaml_scalar(book.series)}")
    if year:
        lines.append(f"year: {year}")
    if book.isbn:
        lines.append(f"isbn: {yaml_scalar(book.isbn)}")
    if book.doi:
        lines.append(f"doi: {yaml_scalar(book.doi)}")
    if rating is not None:
        lines.append(f"rating: {rating}")
    if book_language:
        lines.append(f"book_language: {yaml_scalar(book_language)}")
    if cover_path:
        lines.append(f"cover: {yaml_scalar(cover_path)}")
    if book.tags:
        lines.append("tags:")
        for tag in book.tags:
            lines.append(f"  - {yaml_scalar(tag)}")
    lines.extend(
        [
            "---",
            "",
            "Imported from Calibre as bibliographic metadata. No review text has been added yet.",
            "",
        ]
    )
    return "\n".join(lines)


def parse_profiles(value: str) -> list[str]:
    profiles = [item.strip() for item in value.split(",") if item.strip()]
    if not profiles:
        raise argparse.ArgumentTypeError("At least one profile is required")
    return profiles


def parse_ids(value: str) -> set[int]:
    ids: set[int] = set()
    for item in value.split(","):
        item = item.strip()
        if not item:
            continue
        try:
            ids.add(int(item))
        except ValueError as exc:
            raise argparse.ArgumentTypeError(f"Invalid book id: {item}") from exc
    if not ids:
        raise argparse.ArgumentTypeError("At least one id is required")
    return ids


def parse_rating(value: str) -> int | float:
    try:
        rating = float(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError(f"Invalid rating: {value}") from exc
    if rating < 0 or rating > 5:
        raise argparse.ArgumentTypeError("Rating must be between 0 and 5")
    return int(rating) if rating.is_integer() else rating


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--library", required=True, type=Path, help="Calibre library directory")
    parser.add_argument("--source-key", required=True, help="Stable source key, for example gis")
    parser.add_argument("--collection-name", required=True, help="Reading collection name")
    parser.add_argument("--collection-ref", help="Stable reading collection key")
    parser.add_argument("--collection-en", help="English reading collection label")
    parser.add_argument("--collection-es", help="Spanish reading collection label")
    parser.add_argument("--collection-ca", help="Catalan reading collection label")
    parser.add_argument("--profiles", required=True, type=parse_profiles, help="Comma-separated profiles")
    parser.add_argument("--ids", type=parse_ids, help="Comma-separated Calibre book IDs to import")
    parser.add_argument("--lang", default="en", help="Generated page language")
    parser.add_argument("--status", default="queued", help="Reading status")
    parser.add_argument("--rating", type=parse_rating, help="Manual project rating from 0 to 5; Calibre ratings are never imported")
    parser.add_argument("--limit", type=int, help="Limit number of new books")
    parser.add_argument("--write", action="store_true", help="Write Markdown files and copy covers")
    parser.add_argument("--refresh-existing", action="store_true", help="Rewrite matching imported Markdown files")
    parser.add_argument("--repo-root", default=Path.cwd(), type=Path, help="Template repository root")
    args = parser.parse_args()

    repo_root = args.repo_root.resolve()
    library = args.library.resolve()
    books_dir = repo_root / "_books"
    covers_dir = repo_root / "assets" / "img" / "books"
    source_key = slugify(args.source_key)
    collection_ref = slugify(args.collection_ref) if args.collection_ref else None
    collection_labels = {
        lang: label
        for lang, label in {
            "en": args.collection_en,
            "es": args.collection_es,
            "ca": args.collection_ca,
        }.items()
        if label
    }

    all_books = load_books(library)
    books = all_books
    selected_ids = args.ids
    if selected_ids:
        available_ids = {book.calibre_id for book in books}
        missing_ids = sorted(selected_ids - available_ids)
        if missing_ids:
            raise SystemExit(f"Book IDs not found in library: {', '.join(str(item) for item in missing_ids)}")
        books = [book for book in books if book.calibre_id in selected_ids]
    imported_ids = existing_imports(books_dir, source_key)
    if args.refresh_existing:
        new_books = books
    else:
        new_books = [book for book in books if book.calibre_id not in imported_ids]
    if args.limit is not None:
        new_books = new_books[: args.limit]
    duplicate_groups = duplicate_title_groups(new_books)
    cover_count = sum(1 for book in new_books if cover_source(library, book))

    print(f"Calibre library: {library}")
    print(f"Books in library: {len(all_books)}")
    print(f"Books selected from library: {len(books)}")
    print(f"Already imported for source '{source_key}': {len(imported_ids)}")
    print(f"Books to write in this run: {len(new_books)}")
    print(f"Books with local covers in this run: {cover_count}")
    if duplicate_groups:
        print("Duplicate titles in this run:")
        for group in duplicate_groups:
            ids = ", ".join(str(book.calibre_id) for book in group)
            print(f"  - {group[0].title}: {ids}")
    print(f"Mode: {'write' if args.write else 'dry-run'}")

    if args.write:
        books_dir.mkdir(parents=True, exist_ok=True)
        covers_dir.mkdir(parents=True, exist_ok=True)

    for book in new_books:
        slug = f"calibre-{source_key}-{book.calibre_id}-{slugify(book.title)}"
        markdown_path = books_dir / f"{slug}.md"
        source_cover = cover_source(library, book)
        cover_rel = None
        if source_cover:
            cover_rel = f"/assets/img/books/{slug}{source_cover.suffix.lower()}"
        print(f"- {book.calibre_id}: {book.title} -> {markdown_path.relative_to(repo_root)}")

        if not args.write:
            continue

        if source_cover and cover_rel:
            shutil.copy2(source_cover, repo_root / cover_rel.lstrip("/"))
        markdown = markdown_for_book(
            book,
            source_key=source_key,
            collection_name=args.collection_name,
            collection_ref=collection_ref,
            collection_labels=collection_labels,
            profiles=args.profiles,
            lang=args.lang,
            status=args.status,
            rating=args.rating,
            cover_path=cover_rel,
        )
        markdown_path.write_text(markdown, encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
