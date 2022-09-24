# be-itemized [TODO]

Part of what makes the HTML Form tag a useful element is that the platform provides API's centered around the presence of child tags (or external tags that reference the form), identified by the "name" attribute, even tags deeply nested inside of fieldsets, for example.

One of the goals of be-itemized is to provide similar functionality for the itemscope attribute, where [itemprop](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) is used in lieu of the name attribute.

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
</div>
```

What this does:

1.  Attaches a proxy to the div.  To access the proxy:  oDiv.beDecorated.itemized
2.  The proxy does querySelector for the itemprop for the getter (with a little caching).


Example 2:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director" >James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized=name>
    ({name}) => {
      director: 'Steven Spielberg'
    }
  </script>
</div>
```

What this does:

1.  Same as before
2.  Same as before
3.  Adds contenteditable to itemprop=name element.
4.  Attaches event listener to itemprop=name element with type "input".
5.  Looks for event handler inside the script tag.
6.  Only does event handler if name isn't empty.
6.  Sets the director to Steven Spielberg when the user changes the name of the movie

Note that we can add some sort of styling to the h1 element when the attribute contenteditable gets applied, that indicates it is editable.  This seems like an elegant solution to the issue of SSR showing interactive elements before being hydrating.


This is shorthand for:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name" contenteditable>Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <script nomodule be-itemized='{
    "editable": ["name"],
    // "act":{
    //   "ifAllOf": "name",
    // }
    "args": {
      "name": {
        "observeClosest": "[itemscope]",
        "homeInOn": "beDecorated.itemized.name",
        "vft": "textContent"
      }
    },
    "transform": {
      "directorI": "director",
      "trailerI": "trailer",
      "genreI": "genre",
    }
  }'>
    export const itemLookup = async ({name}) => ({
      director: 'Steven Spielberg'
    });
  </script>
</div>
```



All further examples below will assume the same content surrounding the script tag, so we can focus our mental energy on what is changing from example to example.


Example 3:

```html
  <script nomodule be-itemized='["name", "director"]'>
    ({name, director}) => {
...
    }
  </script>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["name", "director"]
  }'>
```

Now attaches two event handlers to the name and director itemprops, and sets them both to contenteditable.

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

oDiv.beDecorated.itemized.items() returns Array.from(oDiv.querySelectorAll('[itemprop]'));

oDiv.beDecorated.itemized.director() does a promise to oDiv.querySelector('[itemprop="director"]) (if null, adds be-vigilant attrib) --overkill?




