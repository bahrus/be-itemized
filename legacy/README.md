# be-itemized [WIP]

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-itemized?style=for-the-badge)](https://bundlephobia.com/result?p=be-itemized)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-itemized?compression=gzip">
[![NPM version](https://badge.fury.io/js/be-itemized.png)](http://badge.fury.io/js/be-itemized)

## Use case

Make server rendered html generate microdata.

After resolving, detaches, and attaches [be-joined](https://github.com/bahrus/be-joined).

Example 1:

```html
<input disabled be-itemized='
  Itemize disabled as is vegetarian.
'>
```

... generates:

```html
<input disabled>
<link -- itemprop="isVegetarian" href="https://schema.org/True">
```

Slight shorthand:

Example 1a:

```html
<input disabled be-itemized='
  ^ disabled as is vegetarian.
'>
```

also works.


Example 2:

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized='
    ^ href via
    [0, 5, "protocol"],
    [8, 12, "domain"],
    [13, 24, "articleType"],
    [25, 27, "&language"],
    [31, 38, "topic"],
    [40, 77, "section"].
  '
  >Basic, Improved - Prototype Definition</a>
</div>
```

results in:

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition
  be-joined='
  Join expression ["", "protocol", "://", "domain", "/", "articleType", "/", "language", "/", "language", "-", "topic", "/#", "section"] as href.
  '
  >Basic, Improved - Prototype Definition</a>
  <meta itemprop=protocol content=https>
  <meta itemprop=domain content=docs.joshatz.com>
  <meta itemprop=articleType content=cheatsheets>
  <meta itemprop=language content=js>
  <input name=language value=js>
  <meta itemprop=topic content=classes>
  <meta itemprop=section content=basic-improved---prototype-definition>
</div>
```

## Running locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Do a git clone or a git fork of repository https://github.com/bahrus/be-itemized
3.  Install node.js
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo in a modern browser.

## Using from ESM Module:

```JavaScript
import 'be-itemized/be-itemized.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-itemized';
</script>
```









