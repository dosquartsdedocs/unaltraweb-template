PYTHON ?= python3
BUNDLE ?= bundle
PORT ?= 4000
HOST ?= 0.0.0.0
BASEURL ?= /unaltraweb-template
SITE_PROFILE ?=
ifeq ($(SITE_PROFILE),project)
START_PATH ?= /en/
else
START_PATH ?= /en/
endif
LIVERELOAD ?= --livereload
LIVERELOAD_PORT ?= 35729
LOCAL_CORE ?= ../unaltraweb
LOCAL_GEMFILE := tmp/Gemfile.local
DEV_CONFIG := tmp/_config.development.yml
PROFILE_CONFIG := tmp/_config.profile.yml
LOCAL_BUNDLE_APP_CONFIG ?= tmp/bundle_config
LOCAL_BUNDLE_PATH ?= tmp/bundle_path
PYTHONUSERBASE ?= tmp/python_user
PIP_CACHE_DIR ?= tmp/pip_cache
PIP_STAMP := $(PYTHONUSERBASE)/.requirements.sha256
DOCKER_IMAGE ?= amirpourmand/al-folio:v0.16.1
PLAYWRIGHT_IMAGE ?= mcr.microsoft.com/playwright:v1.56.1-noble
CONTAINER ?= unaltraweb-template-jekyll-dev
CV_PDF ?= assets/pdf/cv.pdf
CV_PREVIEW ?= assets/img/cv-preview.jpg
LOCAL_UID ?= $(shell id -u)
LOCAL_GID ?= $(shell id -g)
LOCAL_URL := http://localhost:$(PORT)$(BASEURL)$(START_PATH)
LOCAL_JEKYLL_CONFIG := $(LOCAL_CORE)/_config.yml,_config.yml
ACTIVE_JEKYLL_CONFIG := $(LOCAL_JEKYLL_CONFIG)
ifneq ($(strip $(SITE_PROFILE)),)
ACTIVE_JEKYLL_CONFIG := $(LOCAL_JEKYLL_CONFIG),$(PROFILE_CONFIG)
endif
SERVE_JEKYLL_CONFIG := $(ACTIVE_JEKYLL_CONFIG),$(DEV_CONFIG)

DOCKER_PORTS = -p $(PORT):$(PORT)
SERVE_LIVERELOAD_ARGS =
ifneq ($(strip $(LIVERELOAD)),)
DOCKER_PORTS += -p $(LIVERELOAD_PORT):$(LIVERELOAD_PORT)
SERVE_LIVERELOAD_ARGS = $(LIVERELOAD) --livereload-port $(LIVERELOAD_PORT)
endif

.PHONY: bootstrap local-core-check local-gemfile profile-config dev-config python-deps bundle-install open serve serve-native build build-native test test-native down metrics-scimago-fetch metrics-update metrics-update-all metrics-check cv-preview docker-serve docker-serve-local docker-build docker-build-local docker-down open-local render-smoke render-smoke-local serve-local build-local

bootstrap:
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'bundle install && python3 -m pip install --break-system-packages --user -r requirements.txt'

local-core-check:
	@test -d "$(LOCAL_CORE)" || (echo "Set LOCAL_CORE to the local unaltraweb checkout path." && exit 1)
	@test -f "$(LOCAL_CORE)/unaltraweb.gemspec" || (echo "$(LOCAL_CORE) does not look like an unaltraweb checkout." && exit 1)

local-gemfile:
	@mkdir -p tmp
	@printf '%s\n' 'source "https://rubygems.org"' '' 'group :jekyll_plugins do' '  gem "unaltraweb", path: "$(LOCAL_CORE)"' 'end' > "$(LOCAL_GEMFILE)"

profile-config:
	@mkdir -p tmp
	@if test -n "$(SITE_PROFILE)"; then \
	  profile="$(SITE_PROFILE)"; \
	  title="unaltraweb $$profile"; \
	  description="Demo $$profile website built with unaltraweb."; \
	  if test "$$profile" = "personal"; then title="Roger Tomlinson"; description="Demo personal academic website built with unaltraweb."; fi; \
	  if test "$$profile" = "project"; then title="unaltraweb project"; description="Demo research project website built with unaltraweb."; fi; \
	  printf '%s\n' 'title: '"$$title" 'description: >' '  '"$$description" 'unaltraweb:' '  site_profile: '"$$profile" > "$(PROFILE_CONFIG)"; \
	  if test "$$profile" = "project"; then printf '%s\n' 'pagination:' '  enabled: false' >> "$(PROFILE_CONFIG)"; fi; \
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

bundle-install: local-gemfile
	@mkdir -p "$(LOCAL_BUNDLE_APP_CONFIG)" "$(LOCAL_BUNDLE_PATH)"
	BUNDLE_GEMFILE=$(LOCAL_GEMFILE) BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) check || BUNDLE_GEMFILE=$(LOCAL_GEMFILE) BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) install

open open-local:
	@printf 'Opening %s\n' "$(LOCAL_URL)"
	@xdg-open "$(LOCAL_URL)" >/dev/null 2>&1 || sensible-browser "$(LOCAL_URL)" >/dev/null 2>&1 || printf 'Open this URL manually: %s\n' "$(LOCAL_URL)"

serve: local-core-check
	@printf 'Local URL: %s\n' "$(LOCAL_URL)"
	@(sleep 45; xdg-open "$(LOCAL_URL)" >/dev/null 2>&1 || true) & \
	docker run --name "$(CONTAINER)" --rm -it --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp $(DOCKER_PORTS) -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make serve-native LOCAL_CORE=/srv/unaltraweb PORT=$(PORT) HOST=$(HOST) LIVERELOAD="$(LIVERELOAD)" LIVERELOAD_PORT=$(LIVERELOAD_PORT) SITE_PROFILE="$(SITE_PROFILE)"'

serve-native serve-local: local-core-check profile-config dev-config python-deps bundle-install
	JEKYLL_ENV=development PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" BUNDLE_GEMFILE=$(LOCAL_GEMFILE) BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec jekyll serve --config "$(SERVE_JEKYLL_CONFIG)" --host $(HOST) --port $(PORT) $(SERVE_LIVERELOAD_ARGS) --disable-disk-cache

build: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make build-native LOCAL_CORE=/srv/unaltraweb SITE_PROFILE="$(SITE_PROFILE)"'

build-native build-local: local-core-check profile-config python-deps bundle-install
	JEKYLL_ENV=production PYTHONUSERBASE="$(abspath $(PYTHONUSERBASE))" PIP_CACHE_DIR="$(abspath $(PIP_CACHE_DIR))" PATH="$(abspath $(PYTHONUSERBASE))/bin:$(PATH)" BUNDLE_GEMFILE=$(LOCAL_GEMFILE) BUNDLE_APP_CONFIG=$(abspath $(LOCAL_BUNDLE_APP_CONFIG)) BUNDLE_PATH=$(abspath $(LOCAL_BUNDLE_PATH)) $(BUNDLE) exec jekyll build --config "$(ACTIVE_JEKYLL_CONFIG)" --disable-disk-cache

metrics-scimago-fetch: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make python-deps LOCAL_CORE=/srv/unaltraweb && PYTHONUSERBASE=/srv/jekyll/$(PYTHONUSERBASE) PIP_CACHE_DIR=/srv/jekyll/$(PIP_CACHE_DIR) PATH=/srv/jekyll/$(PYTHONUSERBASE)/bin:$$PATH /srv/unaltraweb/scripts/biblio/fetch_scimago_csv.sh'

metrics-update: local-core-check
	docker run --rm -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make python-deps LOCAL_CORE=/srv/unaltraweb && PYTHONUSERBASE=/srv/jekyll/$(PYTHONUSERBASE) PIP_CACHE_DIR=/srv/jekyll/$(PIP_CACHE_DIR) PATH=/srv/jekyll/$(PYTHONUSERBASE)/bin:$$PATH python3 /srv/unaltraweb/scripts/biblio/metrics_update.py && chown -R $(LOCAL_UID):$(LOCAL_GID) _bibliography/papers.bib _data/metrics.yml tmp 2>/dev/null || true'

metrics-update-all: metrics-scimago-fetch metrics-update

metrics-check: local-core-check
	docker run --rm --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make python-deps LOCAL_CORE=/srv/unaltraweb && PYTHONUSERBASE=/srv/jekyll/$(PYTHONUSERBASE) PIP_CACHE_DIR=/srv/jekyll/$(PIP_CACHE_DIR) PATH=/srv/jekyll/$(PYTHONUSERBASE)/bin:$$PATH python3 /srv/unaltraweb/scripts/biblio/metrics_update.py --offline --dry-run && make build-native LOCAL_CORE=/srv/unaltraweb'

cv-preview: local-core-check
	docker run --rm -e HOME=/tmp -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'set -e; if ! command -v gs >/dev/null 2>&1 && ! command -v pdftoppm >/dev/null 2>&1 && ! command -v mutool >/dev/null 2>&1; then printf "Installing poppler-utils for PDF preview rendering.\n"; apt_log=/tmp/cv-preview-apt.log; if ! apt-get update -qq >"$$apt_log" 2>&1 || ! DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends poppler-utils >>"$$apt_log" 2>&1; then cat "$$apt_log"; exit 1; fi; fi; /srv/unaltraweb/scripts/cv/render_pdf_preview.sh "$(CV_PDF)" "$(CV_PREVIEW)"; out_dir=$$(dirname "$(CV_PREVIEW)"); chown "$(LOCAL_UID):$(LOCAL_GID)" "$(CV_PREVIEW)" "$$out_dir"'

test test-native render-smoke render-smoke-local: local-core-check
	@mkdir -p tmp/render-smoke
	@set -e; \
	server_log="tmp/render-smoke/jekyll.log"; \
	server_cid=$$(docker run -d --user "$(LOCAL_UID):$(LOCAL_GID)" -e HOME=/tmp --network host -v "$(CURDIR):/srv/jekyll" -v "$(abspath $(LOCAL_CORE)):/srv/unaltraweb:ro" -w /srv/jekyll $(DOCKER_IMAGE) bash -lc 'make serve-native LOCAL_CORE=/srv/unaltraweb HOST=127.0.0.1 PORT=$(PORT) LIVERELOAD= SITE_PROFILE="$(SITE_PROFILE)"' ); \
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

down docker-down:
	-docker compose down --remove-orphans
	-docker stop "$(CONTAINER)" >/dev/null 2>&1 || true
	-docker rm "$(CONTAINER)" >/dev/null 2>&1 || true

docker-serve docker-serve-local: serve
docker-build docker-build-local: build
