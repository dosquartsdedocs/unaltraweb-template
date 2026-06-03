---
title: Col·lecció de documentació
description: El model de contingut usat pel perfil unaltredocs.
lang: ca
ref: software_documentation_collection
profiles: [unaltredocs]
section: Estàndards
weight: 200
permalink: /ca/docs/colleccio-documentacio/
---

La barra lateral unaltredocs es genera des de la col·lecció `_documentation`. Cada document pertany a una `section`; les etiquetes opcionals `subsection` encara poden agrupar enllaços dins d'eixa secció quan un lloc necessita més detall.

<h2 id="documentation-sidebar">Barra lateral de documentació</h2>

La barra lateral mostra cada `section` com un grup d'acordió i ordena els documents per `weight`. El grup actiu s'obri automàticament, mentre la persona lectora pot plegar o desplegar altres grups sense canviar el model de contingut.

```yaml
title: Instal·lar i executar localment
section: Guies d'usuari
weight: 20
profiles: [unaltredocs]
```

Usa rangs de `weight` per mantenir seccions relacionades juntes. Per exemple, `10-99` per a guies d'usuari, `100-199` per a perfils, `200-299` per a estàndards i `300-399` per a documentació de desenvolupament.
