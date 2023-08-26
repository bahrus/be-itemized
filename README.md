# be-itemized [WIP]

## Use case

Make server rendered html generate microdata.

After resolving, detaches, and attaches [be-joined](https://github.com/bahrus/be-joined).

Example 1:

```html
<input disabled be-itemized='
  Itemize disabled property as is vegetarian itemprop.
'>
```

... generates:

```html
```


Only adds if there is no element with itemprop=isVegetarian within itemscope scope.  Attributes ["be-value-added"](https://github.com/bahrus/be-value-added) and ["be-a-beacon"](https://github.com/bahrus/be-a-beacon) aren't actually added.  Enhancements added quietly.  *be-value-added* enhancement only added if no other be-value-added extended enhancement already present.


Example 2:

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-itemized="
    Itemize href from expression {protocol as text be-exported}://{domain}/{articleType}/{language}/{language}-{classes}/#{section}.
  "
  >Basic, Improved - Prototype Definition</a>
</div>
```

results in:

```html
<div itemscope>
  <a href=https://docs.joshuatz.com/cheatsheets/js/js-classes/#basic-improved---prototype-definition be-joined="
      Join {protocol}://{domain}/{articleType}/{language}/{language}-{classes}/#{section} as href.
  "
  >Basic, Improved - Prototype Definition</a>
  <meta itemprop=protocol content=https be-value-added>
  <meta itemprop=domain content=docs.joshatz.com be-value-added>
  <meta itemprop=articleType content=cheatsheets be-value-added>
  <meta itemprop=language content=js be-value-added>
  <meta itemprop=topic content=classes be-value-added>
  <meta itemprop=section content=basic-improved---prototype-definition be-value-added>
</div>
```

be-exported means declarative web component will expose property / attribute to be passed in externally.




