PYTHON ?= python3
BUNDLE ?= bundle
CORE_PATH := $(shell $(BUNDLE) show unaltraweb 2>/dev/null)
JEKYLL_CONFIG := $(CORE_PATH)/_config.yml,_config.yml

.PHONY: bootstrap core-check serve build metrics-scimago-fetch metrics-update metrics-update-all metrics-check docker-build docker-serve

bootstrap:
	$(BUNDLE) install
	$(PYTHON) -m pip install -r requirements.txt

core-check:
	@test -n "$(CORE_PATH)" || (echo "Run 'make bootstrap' first so Bundler can install unaltraweb." && exit 1)

serve: core-check
	$(BUNDLE) exec jekyll serve --config "$(JEKYLL_CONFIG)" --host 0.0.0.0 --port 4000 --livereload

build: core-check
	JEKYLL_ENV=production $(BUNDLE) exec jekyll build --config "$(JEKYLL_CONFIG)"

metrics-scimago-fetch: core-check
	$(CORE_PATH)/scripts/biblio/fetch_scimago_csv.sh

metrics-update: core-check
	$(PYTHON) $(CORE_PATH)/scripts/biblio/metrics_update.py

metrics-update-all: metrics-scimago-fetch metrics-update

metrics-check: core-check
	$(PYTHON) $(CORE_PATH)/scripts/biblio/metrics_update.py --offline --dry-run
	$(MAKE) build

docker-build:
	docker compose run --rm --entrypoint "bash -lc 'bundle install && python3 -m pip install --break-system-packages -r requirements.txt && make build'" jekyll

docker-serve:
	docker compose run --rm --service-ports --entrypoint "bash -lc 'bundle install && python3 -m pip install --break-system-packages -r requirements.txt && make serve'" jekyll
