---
title: Preparar un nou lloc web
description: Crear un repositori fill, triar un perfil i connectar-lo amb la gem unaltraweb.
lang: ca
ref: prepare_new_website
profiles: [unaltredocs]
section: Guies d'usuari
weight: 15
permalink: /ca/docs/preparar-nou-lloc/
---

Comença un lloc nou com a repositori fill. El fill manté contingut, configuració i recursos locals; els layouts, estils, plugins i workflows compartits venen de la gem `unaltraweb`.

## 1. Crea el repositori

La ruta més ràpida és crear un repositori nou des del scaffold inicial `unaltraweb-template`. En GitHub, usa el flux de repositori plantilla o copia la plantilla en un repositori nou, després reanomena el projecte, actualitza `_config.yml` i conserva només les col·leccions de contingut que necessites.

GitHub és el destí de publicació per defecte perquè els workflows reutilitzables de GitHub Actions només s'executen allí. GitLab, Bitbucket o un altre host també poden funcionar, però hauràs d'aportar tu els passos equivalents de CI i desplegament.

## 2. Tria el perfil de lloc

Defineix el perfil de construcció en `_config.yml` del lloc fill:

```yaml
unaltraweb:
  site_profile: unaltreselfie
```

Usa `unaltreselfie` per a un lloc personal acadèmic, `unaltreprojecte` per a un projecte o infraestructura, `unaltremanual` per a material docent tipus llibre i `unaltredocs` per a portals de documentació.

## 3. Consumeix el nucli

La ruta normal per a un lloc fill és consumir el nucli mitjançant la gem en `Gemfile`:

```ruby
source "https://rubygems.org"

group :jekyll_plugins do
  gem "unaltraweb"
end
```

Durant treball de pre-release la plantilla pot apuntar al repositori de GitHub en lloc de RubyGems. Una ruta local de nucli com `LOCAL_CORE=../unaltraweb` només fa falta quan estàs editant el nucli i vols que el lloc fill prove eixos canvis locals abans de publicar una gem o actualitzar la dependència.

## 4. Executa el scaffold localment

Des del repositori fill, instal·la dependències i llança una previsualització de perfil:

```bash
make bootstrap
make serve-unaltreselfie
```

Canvia el target `serve-*` pel perfil que estigues construint. El Makefile crea overlays temporals de perfil per a la previsualització local; la configuració de producció ha de quedar-se en `_config.yml`.
