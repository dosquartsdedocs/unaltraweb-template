---
title: Frequently asked questions
description: Short answers about profiles, builds, local previews and documentation ownership.
lang: en
ref: documentation_faq
profiles: [unaltredocs]
section: FAQs
weight: 500
permalink: /en/docs/faq/
---

## Is a profile the same as a layout?

No. A profile is the build-time website family selected for the child site. Layouts are still normal Jekyll layouts used inside that profile.

## Can a child site rename the sidebar sections?

Yes. The sidebar reads section names from each documentation page's `section` front matter, so a child site can use labels such as `User guides`, `Support`, `Developers` or its own vocabulary.

## Should end-user guides and developer notes be mixed?

Prefer not. Keep visitor-facing documentation in `User guides` and maintenance/build details in `Developers` or `Operations` so readers can choose the right path quickly.

## Where does search data come from?

The documentation search index is generated during the Jekyll build from the documentation collection. It does not call external services at build time.
