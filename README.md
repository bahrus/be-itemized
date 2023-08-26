# be-itemized [WIP]

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
<link itemprop="isVegetarian" href="https://schema.org/True">
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
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized="
    Itemize href from expression {protocol}://{domain}/{articleType}/{language}/{language}-{classes}/#{section}.
  "
  >Basic, Improved - Prototype Definition</a>
</div>
```

results in:

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition
  >Basic, Improved - Prototype Definition</a>
  <meta itemprop=protocol content=https>
  <meta itemprop=domain content=docs.joshatz.com>
  <meta itemprop=articleType content=cheatsheets>
  <meta itemprop=language content=js>
  <meta itemprop=topic content=classes>
  <meta itemprop=section content=basic-improved---prototype-definition>
</div>
```

[TODO] Bug:  section not getting set properly set.





