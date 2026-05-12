# unaltraweb-template

Starter repository for academic, research project, software and documentation websites based on [`dosquartsdedocs/unaltraweb`](https://github.com/dosquartsdedocs/unaltraweb).

## Edit this

- `_config.yml`
- `_pages/`
- `_posts/`
- `_bibliography/papers.bib`
- `_data/`
- `assets/img/`

## Do not usually edit this

- `Gemfile`
- `Makefile`
- `docker-compose.yml`
- `.github/workflows/`

Core layouts, includes, styles, plugins and bibliometric scripts come from `dosquartsdedocs/unaltraweb`.

## Local workflow

```bash
make bootstrap
make serve
make metrics-update
make build
```

With Docker:

```bash
make docker-serve
make docker-build
```

## GitHub workflow

Small content edits can be done directly in GitHub. Pushes to `main` build and deploy the site to `gh-pages`.
