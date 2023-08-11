# be-itemized [TODO]

## Use case

Make server rendered html generate microdata.

Example 1:

```html
<input disabled be-itemized='{
  "disabled": "isVegetarian"
}'>
```

generates:

```html
<input disabled be-itemized='{
  "disabled": "isVegetarian"
}'>
<link itemprop=isVegetarian href="https://schema.org/True">
```

Example 2:

```html
<a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized='{
    "href": "{protocol}://{domain}/{{articleType}}/{language}/{{language}}-{classes}/#{section}"
}'
>Basic, Improved - Prototype Definition</a>
```

results in:

```html
<a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized='{
    "href": "{protocol}://{domain}/{{articleType}}/{language}/{{language}}-{classes}/#{section}"
}'
>Basic, Improved - Prototype Definition</a>
<meta itemprop=protocol content=https>
<meta itemprop=domain content=docs.joshatz.com>
<meta itemprop=articleType content=cheatsheets>
<meta itemprop=language content=js>
<meta itemprop=topic content=classes>
<meta itemprop=section content=basic-improved---prototype-definition>
```

The parameters with double braces also pass the value to the host.



