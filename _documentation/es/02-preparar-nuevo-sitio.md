---
title: Preparar un nuevo sitio web
description: Crear un repositorio hijo, elegir un perfil y conectarlo con la gema unaltraweb.
lang: es
ref: prepare_new_website
profiles: [unaltredocs]
section: Guías de usuario
weight: 15
permalink: /es/docs/preparar-nuevo-sitio/
---

Empieza un sitio nuevo como repositorio hijo. El hijo mantiene contenido, configuración y recursos locales; los layouts, estilos, plugins y workflows compartidos vienen de la gema `unaltraweb`.

## 1. Crea el repositorio

La ruta más rápida es crear un repositorio nuevo desde el scaffold inicial `unaltraweb-template`. En GitHub, usa el flujo de repositorio plantilla o copia la plantilla en un repositorio nuevo, después renombra el proyecto, actualiza `_config.yml` y conserva solo las colecciones de contenido que necesites.

GitHub Pages es el destino de publicación por defecto. Siempre que sea posible, publica localmente a la rama generada `gh-pages`; usa el workflow manual de GitHub Actions cuando los colaboradores no puedan publicar desde una copia local. GitLab, Bitbucket u otro host también pueden funcionar, pero tendrás que aportar tú el paso de despliegue equivalente.

## 2. Elige el perfil de sitio

Define el perfil de construcción en `_config.yml` del sitio hijo:

```yaml
unaltraweb:
  site_profile: unaltreselfie
```

Usa `unaltreselfie` para un sitio personal académico, `unaltreprojecte` para un proyecto o infraestructura, `unaltremanual` para material docente tipo libro y `unaltredocs` para portales de documentación.

## 3. Consume el núcleo

La ruta normal para un sitio hijo es consumir el núcleo mediante la gema en `Gemfile`:

```ruby
source "https://rubygems.org"

group :jekyll_plugins do
  gem "unaltraweb"
end
```

Durante trabajo de pre-release la plantilla puede apuntar al repositorio de GitHub en vez de RubyGems. Una ruta local de núcleo como `LOCAL_CORE=../unaltraweb` solo hace falta cuando estás editando el núcleo y quieres que el sitio hijo pruebe esos cambios locales antes de publicar una gema o actualizar la dependencia.

## 4. Ejecuta el scaffold localmente

Desde el repositorio hijo, instala dependencias y lanza una previsualización de perfil:

```bash
make bootstrap
make serve-unaltreselfie
```

Cambia el target `serve-*` por el perfil que estés construyendo. El Makefile crea overlays temporales de perfil para la previsualización local; la configuración de producción debe quedarse en `_config.yml`.

Cuando el sitio esté listo, publica localmente:

```bash
make publish
```

Configura GitHub Pages para que publique desde la rama `gh-pages` y la carpeta `/`. Usa `make publish PUBLISH_DRY_RUN=1` para preparar la rama generada sin subirla.
