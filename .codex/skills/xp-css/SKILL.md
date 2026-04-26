---
name: xp-css
description: Use when editing, documenting, or applying the Windows XP/XP.css component API used by this repository. The pages load XP.css from https://unpkg.com/xp.css; the local res/XP files are reference material for matching selectors, variables, ARIA labels, and icon keys.
metadata:
  short-description: Work with the repo's XP.css usage
---

# XP CSS

Use this skill when working with the Windows XP/XP.css styling used by the site. Project pages currently load the stylesheet from:

```html
<link rel="stylesheet" href="https://unpkg.com/xp.css" />
```

The local `res/XP` SCSS and SVG files are reference material for the same component API and keys; do not assume pages are loading them unless the HTML/build setup is changed.

## Workflow

1. For actual page usage, start from the HTML link to `https://unpkg.com/xp.css` and use the established XP.css classes/attributes.
2. For local reference details, inspect `res/XP/index.scss`; it imports the shared GUI base first, then XP overrides:
   `../../gui/index.scss`, `_variables.scss`, `_global.scss`, `_window.scss`, `_buttons.scss`, `_forms.scss`, `_groupbox.scss`, `_tabs.scss`, `_treeview.scss`, `_progressbar.scss`.
3. Read the specific partial before documenting or mirroring behavior. The XP files reflect a GUI.css/XP.css-style component API, so prefer existing selectors and markup contracts over inventing parallel classes.
4. For exact keys, read `references/xp-css-reference.md`. It lists current variables, selectors, control labels, icon filenames, and minimal markup examples.
5. Preserve `svg-load("./icon/name.svg")` paths only when editing the local SCSS. The local theme expects icons relative to `res/XP`.
6. When adding a new visual state to local reference files, update the reference if the change introduces a new public class, CSS variable, ARIA label, or icon key.

## Basic Usage

Use semantic HTML plus the established classes/attributes:

```html
<section class="window" aria-label="Example">
  <div class="title-bar">
    <div class="title-bar-text">Example</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
  <div class="window-body">...</div>
</section>
```

Important contracts:

- Title-bar control icons are selected by `button[aria-label="Minimize|Maximize|Restore|Help|Close"]`.
- Radio and checkbox art depends on `input + label` adjacency.
- Tabs depend on `menu[role="tablist"]`, child `button`, `button[aria-selected="true"]`, and `[role="tabpanel"]`.
- Vertical range styling uses a wrapper with `.is-vertical > input[type="range"]`.
- Box-style range thumbs use `input[type="range"].has-box-indicator`.

## Reference

Open `references/xp-css-reference.md` when you need:

- all CSS custom property keys currently present in the local `res/XP` reference files;
- all public class names and attribute selector keys;
- title-bar `aria-label` values;
- SVG icon key names available in the local `res/XP/icon` reference directory;
- component-specific markup snippets.
