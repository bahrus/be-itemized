# be-itemized [TODO]

Example 1:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director" contenteditable>James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized></script>
</div>
```

Commits a "cardinal sin" and attaches a proxy onto the div element called "itemized", that behaves similar to how the form element behaves with named elements inside:

The proxy supports getters that return the element matching the name, so for example:

oDiv.itemized.trailer returns div.querySelector('[itemprop="trailer"]')

Unfortunately, I don't think await is allowed with property getters.

so oDiv.itemized.trailer() either returns div.querySelector('[itemprop="trailer"]') or a promise

oDiv.itemized.assign({
  name: 'Jurassic Park',
  director: 'Steven Spielberg',
  genre: 'Science Fiction',
  trailer: 'https://www.youtube.com/watch?v=_jKEqDKpJLw'
});

https://stackoverflow.com/questions/1391278/contenteditable-change-events



