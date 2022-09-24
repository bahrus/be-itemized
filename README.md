# be-itemized [TODO]

Example 1:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director" >James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized>
  </script>
</div>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["name"]
  }'></script>
```

and does the following:

1.  Attaches a proxy to the div.  To access the proxy:  oDiv.beDecorated.itemized
2.  The proxy does querySelector for the itemprop for the getter.
3.  Adds contenteditable to itemprop=name element.
4.  Attaches event listener to itemprop=name element.
5.  Looks for event handler inside the script tag.


Example 2:

```html
  <script nomodule be-itemized=director>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["directory"]
  }'>
```

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name" contenteditable>Avatar</h1>
  <span>Director:
    <span itemprop="director" >James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized>
    ({name, self}) => {
      //do some lookup somewhere
      const retrievedObject = {
        name: 'Jurassic Park',
        director: 'Steven Spielberg',
        genre: 'Science Fiction',
        trailer: 'https://www.youtube.com/watch?v=_jKEqDKpJLw'
      };
      Object.assign(self, retrievedObject)
    }
  </script>
</div>
```

uses default transform tailored for itemscope

can override default transform

Exposed api:

oDiv.beDecorated.itemized.director just does oDiv.querySelector('[itemprop="director"])

oDiv.beDecorated.itemized.director() does a promise to oDiv.querySelector('[itemprop="director"]) (if null, adds be-vigilant attrib)




