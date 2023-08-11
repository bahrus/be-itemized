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



