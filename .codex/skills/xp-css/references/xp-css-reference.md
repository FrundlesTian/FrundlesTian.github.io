# XP CSS Reference

Project pages currently load XP.css from the CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/xp.css" />
```

This reference is derived from the local `res/XP/*.scss` and `res/XP/icon/*.svg` files, which should be treated as local reference material for the same XP.css-style component keys rather than proof that pages load local CSS.

## Usage Pattern From main.html

`main.html` is an XP.css documentation-style page. It uses XP.css by linking the CDN stylesheet in the document head, then writing semantic HTML that XP.css styles directly.

Core rules shown in `main.html`:

- Put `class="surface"` on `body` for the XP surface background.
- Use semantic controls: real `button`, `input`, `select`, `option`, `textarea`, `fieldset`, `legend`, `progress`, `ul`, `li`, `details`, and `summary` elements.
- Pair inputs with labels. Checkbox and radio examples put `<label>` immediately after the `<input>`.
- Use `.field-row` to align related controls horizontally and give them consistent spacing.
- Use `.field-row-stacked` when the label should sit above a text input or textarea.
- Use `aria-label` on title-bar icon buttons; the label controls which icon appears.
- Use ARIA tab markup for tabs: `menu role="tablist"`, child `button role="tab"`, `aria-selected`, `aria-controls`, and matching `article role="tabpanel" id="..."`.
- XP.css supplies CSS only. Any tab switching, theme switching, window controls, or other behavior needs separate JavaScript if interactivity is required.

CDN usage from `main.html`:

```html
<link rel="stylesheet" href="https://unpkg.com/xp.css" />
```

NPM usage shown in `main.html`:

```sh
npm install xp.css
```

```js
// For XP
import "xp.css/dist/XP.css";

// For 98
import "xp.css/dist/98.css";
```

## Import Order

If compiling or editing the local reference theme, `res/XP/index.scss` imports:

```scss
@import "../../gui/index.scss";
@import "_variables.scss";
@import "_global.scss";
@import "_window.scss";
@import "_buttons.scss";
@import "_forms.scss";
@import "_groupbox.scss";
@import "_tabs.scss";
@import "_treeview.scss";
@import "_progressbar.scss";
```

## CSS Custom Properties

Declared in `res/XP/_variables.scss`:

- `--sans-serif`
- `--surface`
- `--button-highlight`
- `--button-face`
- `--button-shadow`
- `--window-frame`
- `--dialog-blue`
- `--input-border-color`
- `--scrollbar-bg`
- `--scrollbar-shadow`

Declared in `res/XP/_forms.scss`:

- `--checkmark-width`
- `--radio-dot-width`
- `--radio-dot-top`
- `--radio-width`
- `--radio-inner-shadow-hover`
- `--radio-bg-active`
- `--radio-bg`
- `--radio-border`
- `--radio-border-disabled`

Declared in `res/XP/_tabs.scss`:

- `--tab-bg`
- `--tab-border`

Declared in `res/XP/_progressbar.scss` on `progress`:

- `--determinate-track`
- `--indeterminate-track`
- `--indeterminate-track-animation`
- `--track-shadow`
- `--track-height`

Inherited from shared GUI base and referenced here:

- `--grouped-element-spacing`

## Public Selectors And Keys

Page-level keys used by `main.html`:

- `body.surface`
- `ontouchstart` on `body` (present in `main.html`, commonly used so touch devices expose active styles)
- `.theme-switcher` (page-specific wrapper, not an XP.css component key)
- `.component` (page-specific documentation wrapper, not an XP.css component key)

Global scrollbars in `_global.scss`:

- `::-webkit-scrollbar`
- `::-webkit-scrollbar-corner`
- `::-webkit-scrollbar-track`
- `::-webkit-scrollbar-track:vertical`
- `::-webkit-scrollbar-track:horizontal`
- `::-webkit-scrollbar-thumb`
- `::-webkit-scrollbar-thumb:vertical`
- `::-webkit-scrollbar-thumb:horizontal`
- `::-webkit-scrollbar-button:vertical:start`
- `::-webkit-scrollbar-button:vertical:end`
- `::-webkit-scrollbar-button:horizontal:start`
- `::-webkit-scrollbar-button:horizontal:end`

Window selectors in `_window.scss`:

- `.window`
- `.window-body` (used by `main.html`; styled by the shared XP.css/GUI base rather than the local XP override partial)
- `.title-bar`
- `.title-bar-text`
- `.title-bar-controls`
- `.title-bar-controls button`
- `.title-bar-controls button[aria-label="Minimize"]`
- `.title-bar-controls button[aria-label="Maximize"]`
- `.title-bar-controls button[aria-label="Restore"]`
- `.title-bar-controls button[aria-label="Help"]`
- `.title-bar-controls button[aria-label="Close"]`
- `.status-bar`
- `.status-bar-field`

Button selectors in `_buttons.scss`:

- `button`
- `button:not(:disabled):active`
- `button:not(:disabled).active`
- `button:not(:disabled):hover`
- `button:focus`
- `button.focused`
- `button::-moz-focus-inner`

Form selectors in `_forms.scss`:

- `label`
- `select`
- `input`
- `textarea`
- `option`
- `select:focus`
- `select:hover`
- `select:active`
- `input[type="radio"]`
- `input[type="radio"] + label`
- `input[type="radio"] + label::before`
- `input[type="radio"]:not([disabled]):not(:active) + label:hover::before`
- `input[type="radio"]:active + label::before`
- `input[type="radio"]:checked + label::after`
- `input[type="radio"]:focus + label`
- `input[type="radio"][disabled]`
- `input[type="radio"][disabled] + label::before`
- `input[type="radio"][disabled]:checked + label::after`
- `input[type="checkbox"]`
- `input[type="checkbox"] + label::before`
- `input[type="checkbox"]:checked + label::after`
- `input[type="checkbox"]:not([disabled]):not(:active) + label:hover::before`
- `input[type="checkbox"]:active + label::before`
- `input[type="checkbox"][disabled]`
- `input[type="checkbox"][disabled] + label::before`
- `input[type="checkbox"][disabled]:checked + label::after`
- `input[type="text"]`
- `input[type="password"]`
- `input[type="email"]`
- `input::selection`
- `textarea::selection`
- `input[type="range"]`
- `input[type="range"].has-box-indicator`
- `.is-vertical > input[type="range"]`

Groupbox selectors in `_groupbox.scss`:

- `fieldset`
- `legend`
- `.field-row`
- `.field-row > * + *`
- `[class^="field-row"] + [class^="field-row"]`
- `.field-row-stacked`
- `.field-row-stacked * + *`

Tab selectors in `_tabs.scss`:

- `.tabs` (used by `main.html`; layout comes from the shared XP.css/GUI base)
- `menu[role="tablist"]`
- `menu[role="tablist"] button`
- `menu[role="tablist"] button:hover`
- `menu[role="tablist"] button[aria-selected="true"]`
- `menu[role="tablist"] button[aria-selected="true"]:first-of-type::before`
- `[role="tabpanel"]`

Tree view selector in `_treeview.scss`:

- `ul.tree-view`

Progress selectors and animation in `_progressbar.scss`:

- `@keyframes sliding`
- `progress`
- `progress[value]`
- `progress:not([value])`
- `progress[value]::-webkit-progress-bar`
- `progress[value]::-webkit-progress-value`
- `progress[value]::-moz-progress-bar`
- `progress:not([value])::-webkit-progress-bar`
- `progress:not([value])::before`
- `progress:not([value])::after`
- `progress:not([value])::-moz-progress-bar`

## ARIA And Attribute Keys

Title-bar control `aria-label` values:

- `Minimize`
- `Maximize`
- `Restore`
- `Help`
- `Close`

Tab attributes:

- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-label`
- `aria-selected="true"`
- `aria-controls`
- `hidden`

Form attributes:

- `type="radio"`
- `type="checkbox"`
- `type="text"`
- `type="password"`
- `type="email"`
- `type="range"`
- `id`
- `for`
- `name`
- `min`
- `max`
- `step`
- `value`
- `rows`
- `disabled`
- `checked`
- `selected`
- `open`

Progress attributes:

- `value`

## SVG Icon Keys

Available under `res/XP/icon`:

- `checkmark`
- `checkmark-disabled`
- `close`
- `close-hover`
- `close-active`
- `dropdown`
- `dropdown-hover`
- `dropdown-active`
- `help`
- `help-hover`
- `help-active`
- `indicator-horizontal`
- `indicator-rectangle-horizontal`
- `maximize`
- `maximize-hover`
- `maximize-active`
- `minimize`
- `minimize-hover`
- `minimize-active`
- `radio-dot`
- `radio-dot-disabled`
- `restore`
- `restore-hover`
- `restore-active`
- `scroll-arrow-down`
- `scroll-arrow-left`
- `scroll-arrow-right`
- `scroll-arrow-up`
- `scroll-background`
- `scroll-background-horizontal`
- `scroll-thumb`
- `scroll-thumb-horizontal`

Use them in SCSS as:

```scss
background-image: svg-load("./icon/close.svg");
```

## Markup Snippets

Page shell and CDN:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/xp.css" />
  </head>
  <body class="surface" ontouchstart>
    ...
  </body>
</html>
```

Tree-view navigation as used by the page sidebar:

```html
<aside>
  <ul class="tree-view">
    <li><a href="#intro">Intro</a></li>
    <li>
      <a href="#components">Components</a>
      <ul>
        <li><a href="#button">Button</a></li>
        <li><a href="#window">Window</a></li>
      </ul>
    </li>
  </ul>
</aside>
```

Theme select row:

```html
<section class="field-row">
  <label>Select a theme</label>
  <select id="theme-switcher-select">
    <option value="XP.css">Windows XP</option>
    <option value="98.css">Windows 98</option>
  </select>
</section>
```

Buttons:

```html
<button>Click me</button>
<button class="active">I am being pressed</button>
<button disabled>I cannot be clicked</button>
<button class="focused">I am focused</button>
```

Window:

```html
<div class="window" style="width: 300px">
  <div class="title-bar">
    <div class="title-bar-text">Title</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
  <div class="window-body">...</div>
</div>
```

Complete window with action row:

```html
<div class="window" style="width: 250px">
  <div class="title-bar">
    <div class="title-bar-text">My First Program</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
  <div class="window-body">
    <p>Hello, world!</p>
    <section class="field-row" style="justify-content: flex-end">
      <button>OK</button>
      <button>Cancel</button>
    </section>
  </div>
</div>
```

Title-bar icon buttons:

```html
<div class="title-bar">
  <div class="title-bar-text">A Helpful Bar</div>
  <div class="title-bar-controls">
    <button aria-label="Help"></button>
    <button aria-label="Close"></button>
  </div>
</div>
```

Status bar:

```html
<div class="status-bar">
  <p class="status-bar-field">Ready</p>
  <p class="status-bar-field">1 object</p>
</div>
```

Field rows:

```html
<div class="field-row">
  <input id="choice-a" type="checkbox" />
  <label for="choice-a">Choice A</label>
</div>

<div class="field-row-stacked">
  <label for="name">Name</label>
  <input id="name" type="text" />
</div>
```

Radio and checkbox adjacency:

```html
<input id="check-a" type="checkbox" />
<label for="check-a">Check A</label>

<div class="field-row">
  <input checked type="checkbox" id="check-b" />
  <label for="check-b">I am checked</label>
</div>

<div class="field-row">
  <input id="radio-a" type="radio" name="sample" />
  <label for="radio-a">Yes</label>
</div>
<div class="field-row">
  <input id="radio-b" type="radio" name="sample" />
  <label for="radio-b">No</label>
</div>
```

Group box:

```html
<fieldset>
  <legend>Today's mood</legend>
  <div class="field-row">
    <input id="mood-a" type="radio" name="mood" />
    <label for="mood-a">Good</label>
  </div>
  <div class="field-row">
    <input id="mood-b" type="radio" name="mood" />
    <label for="mood-b">Better</label>
  </div>
</fieldset>
```

Text input and textarea:

```html
<div class="field-row">
  <label for="occupation">Occupation</label>
  <input id="occupation" type="text" />
</div>

<div class="field-row-stacked" style="width: 200px">
  <label for="notes">Additional notes</label>
  <textarea id="notes" rows="8"></textarea>
</div>
```

Tabs:

```html
<section class="tabs" style="max-width: 500px">
  <menu role="tablist" aria-label="Sample Tabs">
    <button role="tab" aria-selected="true" aria-controls="tab-A">Tab A</button>
    <button role="tab" aria-controls="tab-B">Tab B</button>
  </menu>
  <article role="tabpanel" id="tab-A">
    <h3>Tab Content</h3>
    <p>Visible tab content.</p>
  </article>
  <article role="tabpanel" hidden id="tab-B">
    <h3>More...</h3>
    <p>Hidden tab content.</p>
  </article>
</section>
```

Tree view:

```html
<ul class="tree-view">
  <li>Table of Contents</li>
  <li>
    CSS
    <ul>
      <li>Selectors</li>
      <li>Specificity</li>
    </ul>
  </li>
  <li>
    <details open>
      <summary>JavaScript</summary>
      <ul>
        <li>Use when behavior is needed</li>
      </ul>
    </details>
  </li>
</ul>
```

Progress:

```html
<progress max="100" value="65"></progress>
<progress></progress>
```

Range:

```html
<input type="range" />
<input class="has-box-indicator" type="range" />
<div class="is-vertical">
  <input class="has-box-indicator" type="range" min="1" max="3" step="1" value="2" />
</div>
```

Dropdown:

```html
<select>
  <option>5 - Incredible!</option>
  <option>4 - Great!</option>
  <option selected>3 - Pretty good</option>
</select>
```
