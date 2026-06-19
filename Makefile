PYTHON ?= python3
BUNDLE ?= bundle
METRICS_ARGS ?=
SCIMAGO_INPUT ?=
PORT ?= 4000
HOST ?= 0.0.0.0
BASEURL ?= /unaltraweb-template
SITE_PROFILE ?=
PROFILE ?= unaltreselfie
UNALTRESELFIE_PORT ?= 4001
UNALTREPROJECTE_PORT ?= 4002
UNALTREMANUAL_PORT ?= 4003
UNALTREDOCS_PORT ?= 4004
OPEN_DELAY ?= 25
VISUAL_PROFILES ?= unaltreselfie unaltreprojecte unaltremanual unaltredocs
DOC_SCREENSHOTS_DIR ?= assets/img/screenshots
DOC_SCREENSHOTS ?= home-light-chromium.png project-home-chromium.png manual-home-chromium.png unaltredocs-home-chromium.png
START_PATH ?= /en/
LIVERELOAD ?= --livereload
LIVERELOAD_PORT ?= 35729
LOCAL_CORE ?=
DIAVISUALS_DIR ?= ../diavisuals
DIAVISUALS_COMPAT_PROFILE ?= compat/mermaid-11.4.2-plantuml-1.2026.1.env
DIAGRAM_STYLE_FAMILY ?= benizar
DIAGRAMS_FIND_DIRS ?= assets/diagrams
DIAGRAMS_CACHE_DIR ?= tmp/diagrams
LOCAL_GEMFILE := tmp/Gemfile.local
DEV_CONFIG := tmp/_config.development.yml
PROFILE_CONFIG := tmp/_config.profile$(if $(strip $(SITE_PROFILE)),.$(SITE_PROFILE),).yml
SERVE_DESTINATION := $(if $(strip $(SITE_PROFILE)),tmp/_site.$(SITE_PROFILE),_site)
LOCAL_BUNDLE_APP_CONFIG ?= tmp/bundle_config
LOCAL_BUNDLE_PATH ?= tmp/bundle_path
PYTHONUSERBASE ?= tmp/python_user
PIP_CACHE_DIR ?= tmp/pip_cache
PIP_STAMP := $(PYTHONUSERBASE)/.requirements.sha256
DOCKER_IMAGE ?= ghcr.io/dosquartsdedocs/unaltraweb:main
PLAYWRIGHT_IMAGE ?= mcr.microsoft.com/playwright:v1.56.1-noble
CONTAINER ?= unaltraweb-template-jekyll-dev
CV_PDF ?= assets/pdf/cv.pdf
CV_PREVIEW ?= assets/img/cv-preview.jpg
PUBLISH_REMOTE ?= origin
PUBLISH_BRANCH ?= gh-pages
PUBLISH_SOURCE ?= _site
PUBLISH_WORKTREE ?= tmp/publish-$(PUBLISH_BRANCH)
PUBLISH_DRY_RUN ?= 0
LOCAL_UID ?= $(shell id -u)
LOCAL_GID ?= $(shell id -g)
LOCAL_URL := http://localhost:$(PORT)$(BASEURL)$(START_PATH)
UNALTRESELFIE_URL := http://localhost:$(UNALTRESELFIE_PORT)$(BASEURL)$(START_PATH)
UNALTREPROJECTE_URL := http://localhost:$(UNALTREPROJECTE_PORT)$(BASEURL)$(START_PATH)
UNALTREMANUAL_URL := http://localhost:$(UNALTREMANUAL_PORT)$(BASEURL)$(START_PATH)
UNALTREDOCS_URL := http://localhost:$(UNALTREDOCS_PORT)$(BASEURL)$(START_PATH)
CORE_DIR_RUBY := spec = Gem::Specification.find_by_name("unaltraweb"); print spec.full_gem_path
CORE_CONFIG_RUBY := spec = Gem::Specification.find_by_name("unaltraweb"); print File.join(spec.full_gem_path, "_config.yml")
PROFILE_COMPOSE_FILE := docker-compose.profiles.yml
PROFILE_COMPOSE_LOCAL_CORE_FILE := tmp/docker-compose.local-core.yml
PROFILE_COMPOSE_FILES := -f $(PROFILE_COMPOSE_FILE)
ifneq ($(strip $(LOCAL_CORE)),)
PROFILE_COMPOSE_FILES += -f $(PROFILE_COMPOSE_LOCAL_CORE_FILE)
endif

export DOCKER_IMAGE LOCAL_UID LOCAL_GID UNALTRESELFIE_PORT UNALTREPROJECTE_PORT UNALTREMANUAL_PORT UNALTREDOCS_PORT

DOCKER_PORTS = -p $(PORT):$(PORT)
SERVE_LIVERELOAD_ARGS =
DOCKER_CORE_VOLUME =
DOCKER_LOCAL_CORE =
ifneq ($(strip $(LIVERELOAD)),)
DOCKER_PORTS += -p $(LIVERELOAD_PORT):$(LIVERELOAD_PORT)
SERVE_LIVERELOAD_ARGS = $(LIVERELOAD) --livereload-port $(LIVERELOAD_PORT)
endif
ifneq ($(strip $(LOCAL_CORE)),)
DOCKER_CORE_VOLUME = -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro"
DOCKER_LOCAL_CORE = LOCAL_CORE=/srv/unaltraweb
endif

.PHONY: bootstrap local-core-check local-gemfile profile-config dev-config python-deps bundle-install open open-url profile-compose-local-core serve serve-native serve-profile serve-unaltreselfie serve-unaltreprojecte serve-unaltremanual serve-unaltredocs serve-allprofiles build build-native publish publish-native test test-native screenshots screenshots-all docs-screenshots documentation-screenshots screenshots-docs down down-profiles metrics-scimago-fetch metrics-scimago-fetch-native metrics-update metrics-update-native metrics-update-all metrics-check metrics-check-native cv-preview cv-preview-native diagrams docker-serve docker-serve-local docker-build docker-build-local docker-down open-local render-smoke render-smoke-local serve-local build-local

bootstrap:
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'bundle install && python3 -m pip install --break-system-packages --user -r requirements.txt'

local-core-check:
	@if test -n "$(LOCAL_CORE)"; then \
	  test -d "$(LOCAL_CORE)" || (echo "Set LOCAL_CORE to the local unaltraweb checkout path." && exit 1); \
	  test -f "$(LOCAL_CORE)/unaltraweb.gemspec" || (echo "$(LOCAL_CORE) does not look like an unaltraweb checkout." && exit 1); \
	fi

local-gemfile:
	@if test -n "$(LOCAL_CORE)"; then \
	  mkdir -p tmp; \
	  printf '%s\n' 'source "https://rubygems.org"' '' 'group :jekyll_plugins do' '  gem "unaltraweb", path: "$(LOCAL_CORE)"' 'end' > "$(LOCAL_GEMFILE)"; \
	fi

profile-config:
	@mkdir -p tmp
	@if test -n "$(SITE_PROFILE)"; then \
	  profile="$(SITE_PROFILE)"; \
	  title="unaltraweb $$profile"; \
	  description="Demo $$profile website built with unaltraweb."; \
	  if test "$$profile" = "unaltreselfie"; then title="unaltreselfie"; description="Demo personal academic website built with unaltraweb."; fi; \
	  if test "$$profile" = "unaltreprojecte"; then title="unaltreprojecte"; description="Demo research project website built with unaltraweb."; fi; \
	  if test "$$profile" = "unaltremanual"; then title="unaltremanual"; description="Demo academic manual built with unaltraweb."; fi; \
	  if test "$$profile" = "unaltredocs"; then title="unaltredocs"; description="Demo technical documentation website built with unaltraweb."; fi; \
	  printf '%s\n' 'title: '"$$title" 'description: >' '  '"$$description" 'unaltraweb:' '  site_profile: '"$$profile" > "$(PROFILE_CONFIG)"; \
	  if test "$$profile" = "unaltreprojecte"; then printf '%s\n' 'pagination:' '  enabled: false' >> "$(PROFILE_CONFIG)"; fi; \
	  if test "$$profile" = "unaltremanual"; then printf '%s\n' 'scholar:' '  style: _bibliography/my-apa-cv-no-access.csl' '  bibliography_template: manual-bib' '  group_by: none' >> "$(PROFILE_CONFIG)"; fi; \
	else \
	  rm -f "$(PROFILE_CONFIG)"; \
	fi

dev-config:
	@mkdir -p tmp
	@printf '%s\n' 'developer_mode: true' 'unaltraweb:' '  developer_mode: true' > "$(DEV_CONFIG)"

python-deps:
	@mkdir -p "$(PYTHONUSERBASE)" "$(PIP_CACHE_DIR)"
	@stamp=$$(sha256sum requirements.txt | cut -d' ' -f1); \
	if test -f "$(PIP_STAMP)" && test "$$stamp" = "$$(cat "$(PIP_STAMP)")"; then \
	  printf 'Python requirements already installed.\n'; \
	else \
	  PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" $(PYTHON) -m pip install --break-system-packages --user --no-warn-script-location -r requirements.txt; \
	  printf '%s\n' "$$stamp" > "$(PIP_STAMP)"; \
	fi

bundle-install: local-core-check local-gemfile
	@mkdir -p "$(LOCAL_BUNDLE_APP_CONFIG)" "$(LOCAL_BUNDLE_PATH)"
	@gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; fi; \
	BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) check || \
	BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) install

open open-local:
	@printf 'Opening %s\n' "$(LOCAL_URL)"
	@xdg-open "$(LOCAL_URL)" >/dev/null 2>&1 || sensible-browser "$(LOCAL_URL)" >/dev/null 2>&1 || printf 'Open this URL manually: %s\n' "$(LOCAL_URL)"

open-url:
	@url="$(URL)"; \
	printf 'Opening %s\n' "$$url"; \
	xdg-open "$$url" >/dev/null 2>&1 || sensible-browser "$$url" >/dev/null 2>&1 || printf 'Open this URL manually: %s\n' "$$url"

profile-compose-local-core: local-core-check
	@mkdir -p tmp
	@if test -n "$(LOCAL_CORE)"; then \
	  core="$(abspath $(LOCAL_CORE))"; \
	  printf '%s\n' \
	    'services:' \
	    '  unaltreselfie:' \
	    '    environment:' \
	    '      LOCAL_CORE: /srv/unaltraweb' \
	    '    volumes:' \
	    "      - $$core:/srv/unaltraweb:ro" \
	    '  unaltreprojecte:' \
	    '    environment:' \
	    '      LOCAL_CORE: /srv/unaltraweb' \
	    '    volumes:' \
	    "      - $$core:/srv/unaltraweb:ro" \
	    '  unaltremanual:' \
	    '    environment:' \
	    '      LOCAL_CORE: /srv/unaltraweb' \
	    '    volumes:' \
	    "      - $$core:/srv/unaltraweb:ro" \
	    '  unaltredocs:' \
	    '    environment:' \
	    '      LOCAL_CORE: /srv/unaltraweb' \
	    '    volumes:' \
	    "      - $$core:/srv/unaltraweb:ro" \
	    > "$(PROFILE_COMPOSE_LOCAL_CORE_FILE)"; \
	else \
	  rm -f "$(PROFILE_COMPOSE_LOCAL_CORE_FILE)"; \
	fi

serve-profile: profile-compose-local-core
	@case "$(PROFILE)" in \
	  unaltreselfie) url="$(UNALTRESELFIE_URL)"; service="unaltreselfie" ;; \
	  unaltreprojecte) url="$(UNALTREPROJECTE_URL)"; service="unaltreprojecte" ;; \
	  unaltremanual) url="$(UNALTREMANUAL_URL)"; service="unaltremanual" ;; \
	  unaltredocs) url="$(UNALTREDOCS_URL)"; service="unaltredocs" ;; \
	  *) printf 'Unknown PROFILE=%s. Use unaltreselfie, unaltreprojecte, unaltremanual, or unaltredocs.\n' "$(PROFILE)"; exit 1 ;; \
	esac; \
	printf 'Serving %s at %s\n' "$(PROFILE)" "$$url"; \
	(sleep $(OPEN_DELAY); xdg-open "$$url" >/dev/null 2>&1 || sensible-browser "$$url" >/dev/null 2>&1 || true) & \
	docker compose $(PROFILE_COMPOSE_FILES) up "$$service"

serve-unaltreselfie:
	$(MAKE) serve-profile PROFILE=unaltreselfie

serve-unaltreprojecte:
	$(MAKE) serve-profile PROFILE=unaltreprojecte

serve-unaltremanual:
	$(MAKE) serve-profile PROFILE=unaltremanual

serve-unaltredocs:
	$(MAKE) serve-profile PROFILE=unaltredocs

serve-allprofiles: profile-compose-local-core
	@printf 'Serving all demo profiles. This starts multiple Jekyll servers and can be heavy.\n'
	@printf 'unaltreselfie:   %s\nunaltreprojecte: %s\nunaltremanual:   %s\nunaltredocs:     %s\n' "$(UNALTRESELFIE_URL)" "$(UNALTREPROJECTE_URL)" "$(UNALTREMANUAL_URL)" "$(UNALTREDOCS_URL)"
	@printf 'Opening only unaltreselfie; use the developer switcher to move between profiles.\n'
	@(sleep $(OPEN_DELAY); \
	  xdg-open "$(UNALTRESELFIE_URL)" >/dev/null 2>&1 || sensible-browser "$(UNALTRESELFIE_URL)" >/dev/null 2>&1 || true) & \
	docker compose $(PROFILE_COMPOSE_FILES) up unaltreselfie unaltreprojecte unaltremanual unaltredocs

serve: local-core-check
	@printf 'Local URL: %s\n' "$(LOCAL_URL)"
	@(sleep 45; xdg-open "$(LOCAL_URL)" >/dev/null 2>&1 || true) & \
	docker run --name "$(CONTAINER)" --rm -it --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp $(DOCKER_PORTS) -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make serve-native $(DOCKER_LOCAL_CORE) PORT=$(PORT) HOST=$(HOST) LIVERELOAD="$(LIVERELOAD)" LIVERELOAD_PORT=$(LIVERELOAD_PORT) SITE_PROFILE="$(SITE_PROFILE)"'

serve-native serve-local: profile-config dev-config python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_config="$(abspath $(LOCAL_CORE))/_config.yml"; else core_config=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_CONFIG_RUBY)'); fi; \
	active_config="$$core_config,_config.yml"; \
	if test -n "$(SITE_PROFILE)"; then active_config="$$active_config,$(PROFILE_CONFIG)"; fi; \
	serve_config="$$active_config,$(DEV_CONFIG)"; \
	JEKYLL_ENV=development PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec jekyll serve --config "$$serve_config" --host $(HOST) --port $(PORT) $(SERVE_LIVERELOAD_ARGS) --destination "$(SERVE_DESTINATION)" --disable-disk-cache

build: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make build-native $(DOCKER_LOCAL_CORE) SITE_PROFILE="$(SITE_PROFILE)"'

build-native build-local: profile-config python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_config="$(abspath $(LOCAL_CORE))/_config.yml"; else core_config=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_CONFIG_RUBY)'); fi; \
	active_config="$$core_config,_config.yml"; \
	if test -n "$(SITE_PROFILE)"; then active_config="$$active_config,$(PROFILE_CONFIG)"; fi; \
	JEKYLL_ENV=production PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec jekyll build --config "$$active_config" --disable-disk-cache

publish: build
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -e PUBLISH_REMOTE="$(PUBLISH_REMOTE)" -e PUBLISH_BRANCH="$(PUBLISH_BRANCH)" -e PUBLISH_SOURCE="$(PUBLISH_SOURCE)" -e PUBLISH_WORKTREE="$(PUBLISH_WORKTREE)" -e PUBLISH_DRY_RUN="$(PUBLISH_DRY_RUN)" -e PUBLISH_PREPARE_ONLY=1 -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make publish-native $(DOCKER_LOCAL_CORE)'
	@case "$(PUBLISH_DRY_RUN)" in \
	  1|true|TRUE|yes|YES|y|Y) \
	  printf 'Dry run: prepared %s in %s and skipped git push.\n' "$(PUBLISH_BRANCH)" "$(PUBLISH_WORKTREE)"; \
	  ;; \
	  *) \
	  git_dir=$$(sed -n 's/^gitdir: //p' "$(PUBLISH_WORKTREE)/.git"); \
	  case "$$git_dir" in /srv/jekyll/*) git_dir="$${git_dir#/srv/jekyll/}" ;; esac; \
	  git --git-dir="$$git_dir" --work-tree="$(PUBLISH_WORKTREE)" push --force "$(PUBLISH_REMOTE)" "HEAD:$(PUBLISH_BRANCH)"; \
	  ;; \
	esac

publish-native: bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_dir="$(abspath $(LOCAL_CORE))"; else core_dir=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_DIR_RUBY)'); fi; \
	PUBLISH_REMOTE="$(PUBLISH_REMOTE)" PUBLISH_BRANCH="$(PUBLISH_BRANCH)" PUBLISH_SOURCE="$(PUBLISH_SOURCE)" PUBLISH_WORKTREE="$(PUBLISH_WORKTREE)" PUBLISH_DRY_RUN="$(PUBLISH_DRY_RUN)" PUBLISH_PREPARE_ONLY="$${PUBLISH_PREPARE_ONLY:-0}" "$$core_dir/scripts/deploy/publish_branch.sh"

metrics-scimago-fetch: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make metrics-scimago-fetch-native $(DOCKER_LOCAL_CORE)'

metrics-scimago-fetch-native: python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_dir="$(abspath $(LOCAL_CORE))"; else core_dir=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_DIR_RUBY)'); fi; \
	scimago_args=""; \
	if test -n "$(SCIMAGO_INPUT)"; then scimago_args="--input $(SCIMAGO_INPUT)"; fi; \
	PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" "$$core_dir/scripts/biblio/fetch_scimago_csv.sh" $$scimago_args

metrics-update: local-core-check
	docker run --rm -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make metrics-update-native $(DOCKER_LOCAL_CORE) && chown -R $(LOCAL_UID):$(LOCAL_GID) _bibliography/papers.bib _data/metrics.yml tmp 2>/dev/null || true'

metrics-update-native: python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_dir="$(abspath $(LOCAL_CORE))"; else core_dir=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_DIR_RUBY)'); fi; \
	PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" python3 "$$core_dir/scripts/biblio/metrics_update.py" $(METRICS_ARGS)

metrics-update-all: metrics-scimago-fetch metrics-update

metrics-check: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make metrics-check-native $(DOCKER_LOCAL_CORE)'

metrics-check-native: python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_dir="$(abspath $(LOCAL_CORE))"; else core_dir=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_DIR_RUBY)'); fi; \
	PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" python3 "$$core_dir/scripts/biblio/metrics_update.py" --offline --dry-run $(METRICS_ARGS); \
	$(MAKE) build-native LOCAL_CORE="$(LOCAL_CORE)"

cv-preview: local-core-check
	docker run --rm -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make cv-preview-native $(DOCKER_LOCAL_CORE) CV_PDF="$(CV_PDF)" CV_PREVIEW="$(CV_PREVIEW)" && out_dir=$$(dirname "$(CV_PREVIEW)"); chown "$(LOCAL_UID):$(LOCAL_GID)" "$(CV_PREVIEW)" "$$out_dir"'

cv-preview-native: python-deps bundle-install
	@set -e; \
	gemfile="Gemfile"; \
	if test -n "$(LOCAL_CORE)"; then gemfile="$(LOCAL_GEMFILE)"; core_dir="$(abspath $(LOCAL_CORE))"; else core_dir=$$(BUNDLE_GEMFILE="$$gemfile" BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec ruby -e '$(CORE_DIR_RUBY)'); fi; \
	if ! command -v gs >/dev/null 2>&1 && ! command -v pdftoppm >/dev/null 2>&1 && ! command -v mutool >/dev/null 2>&1; then \
	  printf "Installing poppler-utils for PDF preview rendering.\n"; \
	  apt_log=/tmp/cv-preview-apt.log; \
	  if ! apt-get update -qq >"$$apt_log" 2>&1 || ! DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends poppler-utils >>"$$apt_log" 2>&1; then cat "$$apt_log"; exit 1; fi; \
	fi; \
	"$$core_dir/scripts/cv/render_pdf_preview.sh" "$(CV_PDF)" "$(CV_PREVIEW)"

diagrams:
	@set -e; \
	diavisuals_dir="$(abspath $(DIAVISUALS_DIR))"; \
	profile="$$diavisuals_dir/$(DIAVISUALS_COMPAT_PROFILE)"; \
	test -f "$$diavisuals_dir/tools/style-diagram-source.sh" || (printf 'Set DIAVISUALS_DIR to a diavisuals checkout.\n' >&2; exit 1); \
	test -f "$$profile" || (printf 'Missing diavisuals compatibility profile: %s\n' "$$profile" >&2; exit 1); \
	set -a; . "$$profile"; set +a; \
	image="$${DIAVISUALS_RENDER_IMAGE:?}"; \
	if ! docker image inspect "$$image" >/dev/null 2>&1; then \
	  docker build \
	    -f "$$diavisuals_dir/$${DIAVISUALS_RENDER_DOCKERFILE:?}" \
	    --build-arg MERMAID_CLI_VERSION="$${MERMAID_CLI_VERSION:?}" \
	    --build-arg PLANTUML_VERSION="$${PLANTUML_VERSION:?}" \
	    -t "$$image" \
	    "$$diavisuals_dir"; \
	fi; \
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/workspace" -v "$$diavisuals_dir:/diavisuals:ro" -w /workspace "$$image" bash -lc '\
		set -euo pipefail; \
		mkdir -p "$(DIAGRAMS_CACHE_DIR)"; \
		printf '\''{"args":["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-crash-reporter","--disable-crashpad"]}\n'\'' > "$(DIAGRAMS_CACHE_DIR)/puppeteer.json"; \
		found=0; \
		while IFS= read -r src; do \
			found=1; \
			styled="$(DIAGRAMS_CACHE_DIR)/$${src%.mmd}.styled.mmd"; \
			out="$$src.svg"; \
			mkdir -p "$$(dirname "$$styled")"; \
			printf '\''DIAVISUALS %s -> %s\n'\'' "$$src" "$$out"; \
			/diavisuals/tools/style-diagram-source.sh mermaid "$(DIAGRAM_STYLE_FAMILY)" "$$src" "$$styled"; \
			mmdc -i "$$styled" -o "$$out" -c "/diavisuals/styles/mermaid/$(DIAGRAM_STYLE_FAMILY)-mermaid.json" -p "$(DIAGRAMS_CACHE_DIR)/puppeteer.json"; \
		done < <(find $(DIAGRAMS_FIND_DIRS) -type f -name "*.mmd" | sort); \
		if test "$$found" -eq 0; then printf '\''No Mermaid sources found.\n'\''; fi'

test test-native render-smoke render-smoke-local: local-core-check
	@mkdir -p tmp/render-smoke
	@set -e; \
	server_log="tmp/render-smoke/jekyll.log"; \
	server_cid=$$(docker run -d --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp --network host -v "$(CURDIR):/srv/jekyll" $(DOCKER_CORE_VOLUME) -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make serve-native $(DOCKER_LOCAL_CORE) HOST=127.0.0.1 PORT=$(PORT) LIVERELOAD= SITE_PROFILE="$(SITE_PROFILE)"' ); \
	cleanup() { docker logs $$server_cid > "$$server_log" 2>&1 || true; docker stop $$server_cid >/dev/null 2>&1 || true; docker rm $$server_cid >/dev/null 2>&1 || true; }; \
	trap cleanup EXIT; \
	ready=0; \
	for attempt in $$(seq 1 120); do \
	  if curl -fsS "http://127.0.0.1:$(PORT)$(BASEURL)$(START_PATH)" >/dev/null 2>&1; then ready=1; break; fi; \
	  running=$$(docker inspect -f '{{.State.Running}}' $$server_cid 2>/dev/null || true); \
	  test "$$running" = "true" || break; \
	  sleep 2; \
	done; \
	if test "$$ready" != "1"; then docker logs $$server_cid >&2 || true; exit 1; fi; \
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp --network host --ipc=host -e BASE_URL="http://127.0.0.1:$(PORT)$(BASEURL)" -e RENDER_OUT="tmp/render-smoke" -e SITE_PROFILE="$(SITE_PROFILE)" -e START_PATH="$(START_PATH)" -v "$(CURDIR):/work" -w /work $(PLAYWRIGHT_IMAGE) bash -lc 'npm install --no-save --no-package-lock @playwright/test@1.56.1 >/tmp/playwright-npm.log && npx playwright test tests/render-smoke.spec.mjs --browser=chromium --output=tmp/render-smoke/test-results'

screenshots screenshots-all: local-core-check
	@mkdir -p tmp/render-smoke
	@rm -f tmp/render-smoke/*.png
	@set -e; \
	for profile in $(VISUAL_PROFILES); do \
	  printf '\n== Visual review: %s ==\n' "$$profile"; \
	  $(MAKE) render-smoke SITE_PROFILE="$$profile" LOCAL_CORE="$(LOCAL_CORE)" PORT="$(PORT)" BASEURL="$(BASEURL)"; \
	done; \
	printf '\nScreenshots written to tmp/render-smoke/\n'

docs-screenshots: screenshots
	@mkdir -p "$(DOC_SCREENSHOTS_DIR)"
	@set -e; \
	rm -f "$(DOC_SCREENSHOTS_DIR)"/*.png; \
	for screenshot in $(DOC_SCREENSHOTS); do \
	  test -f "tmp/render-smoke/$$screenshot" || (printf 'Missing tmp/render-smoke/%s\n' "$$screenshot" && exit 1); \
	  cp "tmp/render-smoke/$$screenshot" "$(DOC_SCREENSHOTS_DIR)/"; \
	done; \
	printf 'Copied %s documentation screenshots to %s/\n' "$(words $(DOC_SCREENSHOTS))" "$(DOC_SCREENSHOTS_DIR)"

documentation-screenshots screenshots-docs: docs-screenshots

down docker-down:
	-docker compose down --remove-orphans
	-docker compose -f $(PROFILE_COMPOSE_FILE) down --remove-orphans
	-docker stop "$(CONTAINER)" >/dev/null 2>&1 || true
	-docker rm "$(CONTAINER)" >/dev/null 2>&1 || true

down-profiles:
	-docker compose -f $(PROFILE_COMPOSE_FILE) down --remove-orphans

docker-serve docker-serve-local: serve
docker-build docker-build-local: build
