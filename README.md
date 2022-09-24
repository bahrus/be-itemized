# be-itemized [TODO]

Example 1:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized>
</div>
```

Commits a "cardinal sin" and attaches a proxy onto the div element called "itemized", that behaves similar to how the form element behaves with named elements inside:

The proxy supports getters that return the element matching the name, so for example:

oDiv.itemized.trailer returns div.querySelector('[itemprop="trailer"]')

oDiv.itemized.assign({
  name: 'Jurassic Park',
  director: 'Steven Spielberg',
  genre: 'Science Fiction',
  trailer: 'https://www.youtube.com/watch?v=_jKEqDKpJLw'
});

