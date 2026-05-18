# unaltraweb-template

Starter repository for academic, research project, software and documentation websites based on [`dosquartsdedocs/unaltraweb`](https://github.com/dosquartsdedocs/unaltraweb).

## Edit this

- `_config.yml`
- `_pages/`
- `_projects/`
- `_posts/`
- `_bibliography/papers.bib`
- `_data/`
- `_sass/_site-custom.scss`
- `assets/img/`
- `assets/pdf/`

The `author` block in `_config.yml` powers pages that use `layout: profile`, such as the localized home pages in `_pages/*/index.md`. The prepared website family is selected with `unaltraweb.site_profile`, and standard sections can be toggled with `unaltraweb.features`.

## Do not usually edit this

- `Gemfile`
- `Makefile`
- `docker-compose.yml`
- `.github/workflows/`

Core layouts, includes, styles, plugins and bibliometric scripts come from `dosquartsdedocs/unaltraweb`.

## Custom styles and layouts

Use `_sass/_site-custom.scss` for local colors, fonts and small CSS changes. It is loaded after the core styles, so you can customize the site without editing or forking `unaltraweb`.

For a local layout, create a file such as `_layouts/my-layout.liquid` in this repository and use `layout: my-layout` in a page front matter. Site layouts override or extend core layouts while the rest of the theme still comes from `unaltraweb`.

See the core customization notes in [`docs/customization.md`](https://github.com/dosquartsdedocs/unaltraweb/blob/main/docs/customization.md).

## GitHub-only workflow

Use this template to create a new repository, then edit content directly in GitHub:

- `_config.yml` selects the site profile and public URL.
- `_data/` contains structured content such as team members, teachers, metrics and repositories.
- `_pages/`, `_posts/`, `_projects/`, `_chapters/` and `_bibliography/` contain the editable site content.

Pushes to `main` build and deploy the site with the reusable workflow from `dosquartsdedocs/unaltraweb`. Dependabot opens pull requests when GitHub Actions or Bundler dependencies can be updated.

## Local workflow

```bash
make bootstrap
make serve
make metrics-update
make build
make test
make down
```

The default local workflow runs through Docker and uses the `unaltraweb` gem declared in `Gemfile`. While developing `unaltraweb` and this template side by side, point `LOCAL_CORE` to the local core checkout. This does not require pushing core changes to GitHub:

```bash
make serve LOCAL_CORE=../unaltraweb
make build LOCAL_CORE=../unaltraweb
make test LOCAL_CORE=../unaltraweb
```

`make test` serves the site with the local core, runs Playwright in Docker, tests desktop/mobile rendering and the light/sepia/dark theme modes, and writes screenshots to `tmp/render-smoke/`.

The profile published by GitHub is the one in `_config.yml`:

```yaml
unaltraweb:
  site_profile: personal
```

For local testing, pass `SITE_PROFILE` to `make serve`, `make build` or `make test`. The Makefile writes a temporary config overlay in `tmp/_config.profile.yml`, so you can test another profile without editing `_config.yml` or changing what GitHub Pages will publish:

```bash
make serve SITE_PROFILE=project
make serve SITE_PROFILE=software
make test SITE_PROFILE=project
```

`make serve` also enables a local developer mode overlay that is not loaded by `make build`. The floating developer switcher reports the real build profile while you browse locally.

After replacing the demo CV PDF, regenerate the first-page preview used by the CV pages:

```bash
make cv-preview CV_PDF=assets/pdf/cv.pdf CV_PREVIEW=assets/img/cv-preview.jpg
```

## GitHub Pages

Small content edits can be done directly in GitHub. Pushes to `main` build and deploy the site through GitHub Pages Actions.
