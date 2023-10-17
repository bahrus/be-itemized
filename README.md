# be-itemized [TODO]

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-itemized?style=for-the-badge)](https://bundlephobia.com/result?p=be-itemized)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-itemized?compression=gzip">
[![NPM version](https://badge.fury.io/js/be-itemized.png)](http://badge.fury.io/js/be-itemized)

## Use case

Make server rendered html attributes generate and/or bind to  microdata and form elements.

## Example 1a: [TODO]

```html
<input disabled -disabled={isVegetarian} be-itemized>
```

... generates:

```html
<input disabled -disabled={isVegetarian} be-itemized>
<link -- itemprop="isVegetarian" href="https://schema.org/True">
```

The link element is only generated if no element with attribute itemprop="isVegetarian" is found within the itemscope (css) scope.  

## Example 1b: [TODO]

```html
<input disabled -disabled={@isVegetarian} be-itemized>
```

generates:

```html
<input disabled -disabled={@isVegetarian} be-itemized>
<input type=checkbox name=isVegetarian checked>
```

Again, the input element is only generated if no element with attribute name="isVegetarian" is found within the form and/or Shadow DOM scope is found.  To be safe, if generating these elements on the server or by hand, place the elements *before* element adorned by be-itemized.  To

Modifying the checkbox will affect the input's disabled status (but not the other way around).

be-itemized's functionality is almost identical to be-observant, and (likely) uses be-observant under the hood.  So if editing the HTML by hand, it might be just as effective to use be-observant directly for the use case above.

## Example 2a: [TODO]

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition
   -href="{protocol}://{domain}/{@articleType}/{language}/{language}-{topic}/#{section}"    
   be-itemized
  >Basic, Improved - Prototype Definition</a>
  <select name=articleType>
        <option>cheatsheets</option>
        <option>dissertations</option>
  </select>
</div>
```

results in:

```html
<div itemscope>
  <a 
    href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition
    -href="{protocol}://{domain}/{@articleType}/{language}/{language}-{topic}/#{section}" be-itemized
  >Basic, Improved - Prototype Definition</a>
    <select name=articleType>
        <option selected>cheatsheets</option>
        <option>dissertations</option>
  </select>
  <meta -- itemprop=protocol content=https>
  <meta -- itemprop=domain content=docs.joshatz.com>
  <meta -- itemprop=language content=js>
  <input -- name=language value=js>
  <meta -- itemprop=topic content=classes>
  <meta -- itemprop=section content=basic-improved---prototype-definition>
</div>
```

Changes to the select element will feed back into the href for the hyperlink.

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









