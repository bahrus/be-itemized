# be-itemized [TODO]

## Use case

Make itemscope adorned elements bindable in an easy way.

It is helpful to have a mental model of a typical use case this element decorator / behavior is attempting to assist with.  It might not be the most compelling use case in the world.  Still...

That use case is this:

Suppose we provide a web site where users can search for a movie.  When conducting the search, an API returning JSON provides details regarding the movie.  We want to bind to that JSON on the page. 



```html
<input type=search name=search value=Avatar be-fetching='{
        "pre": "https://movie-db.com/search?name="
}'>
<div itemscope itemtype="http://schema.org/Movie" be-itemized='{
  "model": {"observe": "input", "vft": "beDecorated.fetching.value"}
  }'>
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>  
</div>
```



