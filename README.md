# be-itemized [TODO]

## Use case

Make server rendered html generate microdata.  Complements [be-joined](https://github.com/bahrus/be-joined).

Example 1:

```html
<input disabled be-itemized='{
  "disabled": "{isVegetarian}"
}'>
```

generates:

```html
<link itemprop=isVegetarian be-value-added href="https://schema.org/True">
<input disabled be-itemized='{
  "disabled": "{isVegetarian}"
}'>

```

Only adds if there is no element with itemprop=isVegetarian within Shadow DOM realm.  Attribute ["be-value-added"](https://github.com/bahrus/be-value-added) isn't actually added.  Enhancement added quietly.  Enhancement only added if no other be-value-added extended enhancement is added.

Example 2:

```html
<a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized='{
    "href": "{protocol}://{domain}/{{articleType}}/{language}/{{language}}-{classes}/#{section}"
}'
>Basic, Improved - Prototype Definition</a>
```

results in:

```html
<meta itemprop=protocol content=https>
<meta itemprop=domain content=docs.joshatz.com>
<meta itemprop=articleType content=cheatsheets be-upchucked>
<meta itemprop=language content=js be-upchucked>
<meta itemprop=topic content=classes>
<meta itemprop=section content=basic-improved---prototype-definition>
<a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized='{
    "href": "{protocol}://{domain}/{{articleType}}/{language}/{{language}}-{classes}/#{section}"
}'
>Basic, Improved - Prototype Definition</a>

```

The parameters with double braces also pass the value to the "host-ish".



