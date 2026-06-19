---
title: Prepare A New Website
description: Create a child repository, choose a profile and connect it to the unaltraweb
  gem.
lang: en
ref: prepare_new_website
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- local-editors
- site-designers
- template-maintainers
section: Start Here
weight: 20
permalink: "/en/docs/prepare-new-website/"
nav_title: Prepare Website
---
Start a new site as a child repository. The child keeps content, configuration and local assets; the shared layouts, styles, plugins and workflows come from the `unaltraweb` gem.

## 1. Create the repository

The fastest route is to create a new repository from the `unaltraweb-template` starter scaffold. On GitHub, use the template repository flow or copy the template into a new repository, then rename the project, update `_config.yml` and keep only the content collections you need.

GitHub Pages is the default hosting target. Prefer local publishing to the generated `gh-pages` branch when possible; use the manual GitHub Actions deploy workflow when contributors cannot publish from a local checkout. GitLab, Bitbucket or another host can still work, but you must provide the equivalent deploy step yourself.

## 2. Choose the site profile

Set the build profile in the child site's `_config.yml`:

```yaml
unaltraweb:
  site_profile: unaltreselfie
```

Use `unaltreselfie` for a personal academic site, `unaltreprojecte` for a project or infrastructure site, `unaltremanual` for book-like teaching material, and `unaltredocs` for documentation portals.

## 3. Consume the core

The normal child-site path is to consume the core through the gem entry in `Gemfile`:

```ruby
source "https://rubygems.org"

group :jekyll_plugins do
  gem "unaltraweb"
end
```

During pre-release work the template may point to the GitHub repository instead of RubyGems. A local core path such as `LOCAL_CORE=../unaltraweb` is only needed when you are editing the core and want the child site to test those local changes before publishing a gem or updating the dependency.

## 4. Run the scaffold locally

From the child repository, install dependencies and run one profile preview:

```bash
make bootstrap
make serve-unaltreselfie
```

Switch the `serve-*` target to the profile you are building. The Makefile creates temporary profile overlays for local preview; production configuration should stay in `_config.yml`.

When the site is ready, publish locally:

```bash
make publish
```

Configure GitHub Pages to deploy from the `gh-pages` branch and `/` folder. Use `make publish PUBLISH_DRY_RUN=1` to prepare the generated branch without pushing it.
