---
title: Sucre sintàctic en Markdown
description: Dreceres creatives per a avisos, figures, taules, subfigures i diagrames Mermaid.
lang: ca
ref: software_markdown_syntax_sugar
profiles: [unaltredocs]
section: Estàndards
weight: 240
permalink: /ca/docs/sucre-sintactic/
mermaid:
  enabled: true
  zoomable: false
---

`unaltraweb` manté l'autoria prop del Markdown ordinari. La sintaxi addicional és petita a propòsit: qui escriu conserva un text llegible i el nucli converteix patrons acadèmics repetits en HTML estructurat.

## Drecera per a avisos

Les cites Markdown imbricades es converteixen en avisos docents. Un sol `>` continua sent una cita normal; els nivells més profunds seleccionen el tipus d'avís.

```markdown
>> Una nota o consell.

>>> Un exemple resolt.

>>>> Una advertència.

>>>>> Objectius d'aprenentatge.

>>>>>> Una nota de precaució o perill.
```

>> Una nota o consell.

>>> Un exemple resolt.

>>>> Una advertència.

>>>>> Objectius d'aprenentatge.

>>>>>> Una nota de precaució o perill.

Les etiquetes ixen de `_data/i18n/*.yml`, així que el mateix Markdown es renderitza com `NOTE`, `NOTA`, `OBJECTIUS D'APRENENTATGE`, etc. segons la llengua de la pàgina.

## Figures numerades

Les imatges Markdown en les col·leccions configurades es converteixen en figures semàntiques amb numeració localitzada. El títol de la imatge passa a ser el peu; si no hi ha títol, es reutilitza el text alternatiu.

```markdown
![Placeholder neutre](/assets/img/placeholders/neutral-landscape.svg "Un placeholder horitzontal reutilitzable")
```

![Placeholder neutre]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Un placeholder horitzontal reutilitzable")

## Taules numerades

Usa un bloc `table` quan una taula Markdown necessite peu i comptador propi.

```markdown
::: table "Resum de dreceres"
| Sintaxi | Renderitzador | Resultat |
| --- | --- | --- |
| `>>` | `callouts.js` | Avís amb tema |
| `::: table` | `figure_captions.rb` | Taula numerada |
:::
```

::: table "Resum de dreceres"
| Sintaxi | Renderitzador | Resultat |
| --- | --- | --- |
| `>>` | `callouts.js` | Avís amb tema |
| `::: table` | `figure_captions.rb` | Taula numerada |
:::

## Composicions amb subfigures

Les subfigures usen un bloc compacte. La cadena de composició pot usar files compactes com `abc`, `/` per a files i `+` quan els separadors explícits fan més clara la composició. Els atributs d'imatge com `{: width="70%" }` o `{: height="12rem" }` també funcionen dins de subfigures; dimensionen eixe panell sense obligar tots els elements d'una fila a tenir el mateix pes visual.

```markdown
::: subfigures a+b+c "Tres panells verticals en una fila"
![Panell A](/assets/img/placeholders/neutral-portrait.svg "Panell A"){: width="72%" }
![Panell B](/assets/img/placeholders/neutral-portrait.svg "Panell B"){: width="72%" }
![Panell C](/assets/img/placeholders/neutral-portrait.svg "Panell C"){: width="72%" }
:::
```

::: subfigures a+b+c "Tres panells verticals en una fila"
![Panell A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell A"){: width="72%" }
![Panell B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell B"){: width="72%" }
![Panell C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell C"){: width="72%" }
:::

::: subfigures a/b "Dos panells horitzontals apilats"
![Horitzontal A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Horitzontal A")
![Horitzontal B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Horitzontal B")
:::

## Blocs Mermaid

Les pàgines amb `mermaid.enabled: true` poden mantindre esbossos ràpids en blocs de codi. Usa fonts `.mmd` per a figures reproduïbles renderitzades amb `diavisuals`.

````markdown
```mermaid
flowchart LR
  md[Markdown] --> build[Construcció Jekyll]
  build --> html[Pàgina documentada]
```
````

```mermaid
flowchart LR
  md[Markdown] --> build[Construcció Jekyll]
  build --> html[Pàgina documentada]
```

## Fonts Mermaid com a figures SVG

Quan una imatge apunta a una font `.mmd`, el nucli la reescriu a `.mmd.edited.svg` si aquest fitxer existeix; si no, usa `.mmd.svg`. Així es conserva la font Mermaid llegible i se serveix l'SVG generat o editat a mà. Executa `make diagrams DIAVISUALS_DIR=../diavisuals` per renderitzar aquests exemples amb l'estil compartit.

```markdown
![Flux de capítol](/assets/diagrams/manual-flow.mmd "Flux de capítol")
```

![Flux de capítol]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Flux de capítol renderitzat amb diavisuals")

Usa `a/b` quan els diagrames horitzontals necessiten tota la columna de text.

```markdown
::: subfigures a/b "Diagrames d'estructura"
![Diagrama de flux](/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flux")
![Arbre de fitxers](/assets/diagrams/diavisuals/file-tree.mmd "Arbre de fitxers")
:::
```

::: subfigures a/b "Diagrames d'estructura renderitzats amb l'estil compartit de `diavisuals`"
![Diagrama de flux]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flux")
![Arbre de fitxers]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "Arbre de fitxers i carpetes")
:::

Usa `a+b+c` quan els diagrames verticals s'han de comparar costat a costat.

::: subfigures a+b+c "Diagrames de model verticals renderitzats amb l'estil compartit de `diavisuals`"
![Classes]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Diagrama de classes"){: width="82%" }
![Entitat-relació]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Diagrama entitat-relació"){: width="68%" }
![Estats]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "Diagrama d'estats"){: width="78%" }
:::

Usa figures independents quan el diagrama és una explicació completa i no un panell d'una comparació.

````markdown
```mermaid
quadrantChart
  title Diagram selection guide
  x-axis Static structure --> Time dependent
  y-axis Local detail --> Project overview
```
````

![Quadrant]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Quadrant per seleccionar un tipus de diagrama")

## Per què és deliberat

Aquestes dreceres són creatives però conservadores. Eviten components grans a mida, mantenen llegibles els fitxers font i fan repetibles patrons acadèmics en llocs personals, llocs de projecte, manuals i documentació tècnica.
