# be-itemized

```html
<div itemscope itemtype="http://schema.org/Movie" be-itemized=model>
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
</div>
```

Gets model from host container when it changes, populates elements contained inside based on itemprop settings.