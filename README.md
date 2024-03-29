# be-itemized [TODO]

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-itemized?style=for-the-badge)](https://bundlephobia.com/result?p=be-itemized)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-itemized?compression=gzip">
[![NPM version](https://badge.fury.io/js/be-itemized.png)](http://badge.fury.io/js/be-itemized)

## Use case

Make server rendered html attributes generate and/or bind to  microdata and form elements.

Binding to microdata is useful for

1.  Styling
2.  Providing declarative custom elements (WIP).
3.  Search engine accuracy
4.  Hydrating while HTML streams in without FOUC.
5.  Can serialize state from the server to the browser without requiring all properties of the custom element to have an attribute equivalent.

> [!Note]
> This element enhancement would probably be most effective if it could be partly applied in a Cloudflare or Bun or Deno worker and/or a service worker, [w3c willing](https://github.com/whatwg/dom/issues/1222). 

## Example 1a: [TODO]

```html
<my-custom-element>
    <template shadowrootmode=open>
    <input disabled -disabled=/isVegetarian be-itemized>
    </template>
</my-custom-element>
```

What this does:

1.  Sets host's isVegetarian property to true.
2.  Applies (quietly) be-observant enhancement to input element, so that we end up with the equivalent of


```html
<my-custom-element is-vegetarian>
    #shadow
       <input disabled -disabled=/isVegetarian 
        be-observant='of is vegetarian and assign to disabled.'
       >
</my-custom-element>
```

... only the is-vegetarian and be-observant attributes won't actually be set.

The slash (/) is optional;


## Example 1b: [TODO]

```html
<div>
<input disabled -disabled=$isVegetarian be-itemized>
</div>
```

... generates the equivalent of:

```html
<div itemscope>
<input disabled -disabled=$isVegetarian be-observant='of $ is vegetarian.'>
<link itemprop="isVegetarian" href="https://schema.org/True">
</div>
```




The link element is only generated if no element with attribute itemprop="isVegetarian" is found within the itemscope (css) scope, ideally *before* the element adorned with be-itemized.  

However, if not immediately found, if the presence of an attribute "wait-for-be-a-beacon" is found in the Shadow DOM scope, it will wait for the itemscope'd element to perceive event named "i-am-here" which is the default name of the event emitted by [be-a-beacon](https://github.com/bahrus/be-a-beacon). [TODO]

## Example 1c:  Combining 1a and 1b: [TODO]

```html
<my-custom-element is-vegetarian>
    #shadow
       <input disabled -disabled=/$isVegetarian 
       >
</my-custom-element>
```

This will both set the host's isVegetarian property to true, *and* create the link itemprop tag, and add be-observant to both.

## Example 1d: [TODO]

```html
<input disabled -disabled=@isVegetarian be-itemized>
```

generates the equivalent of:

```html
<input disabled -disabled=@isVegetarian be-observant='of @ is vegetarian.'>
<input type=checkbox name=isVegetarian checked>
```

Again, the input element is only generated if no element with attribute name="isVegetarian" is found within the form and/or Shadow DOM scope is found.  To be safe, if generating these elements on the server or by hand, place the elements *before* element adorned by be-itemized.  

## Example 1e: [TODO]

```html
<my-custom-element>
    <template shadowrootmode=open>
    <div>
    <input disabled -disabled=/$isVegetarian be-itemized>
    </div>
    </template>
</my-custom-element>
```

results in the equivalent of:

```html
<my-custom-element>
    #shadow
    <div itemscope>
      <input disabled -disabled=@/isVegetarian be-observant='of / is vegetarian.'>
      <link -- itemprop=isVegetarian href=https://schema.org/True be-observant='of / is vegetarian.'>
    </div>
</my-custom-element>

```

Modifying the checkbox will affect the input's disabled status (but not the other way around).

be-itemized's functionality is almost identical to be-observant, and (likely) uses be-observant under the hood.  So if editing the HTML by hand, it might be just as effective to use be-observant directly for the use case above.

## Example 1c [TODO]

```html
<input disabled -disabled=@isVegetarian be-itemized>
```

generates:



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
    -href="{protocol}://{domain}/{@articleType}/{language}/{language}-{topic}/#{section}" be-joined
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









