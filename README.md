# be-itemized [TODO]

Part of what makes the HTML Form tag a useful component is that it provides API's centered around the presence of child tags (or external tags that reference the form), identified by the "name" attribute.

One of the goals of be-itemized is to provide similar functionality for the itemscope attribute, where itemprop is used in lieu of the name attribute.

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
    ({name}) => {
      director: 'Steven Spielberg'
    }
  </script>
</div>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["name"],
    "ifAllOf": "name",
    "readOnly": false,
  }'>
    export const itemLookup = async ({name}) => ({
      director: 'Steven Spielberg'
    });
  </script>
```

and does the following:

1.  Attaches a proxy to the div.  To access the proxy:  oDiv.beDecorated.itemized
2.  The proxy does querySelector for the itemprop for the getter.
3.  Adds contenteditable to itemprop=name element.
4.  Attaches event listener to itemprop=name element with type "input".
5.  Looks for event handler inside the script tag.
6.  Only does event handler if name isn't empty.
6.  Sets the director to Steven Spielberg



Example 2:

```html
  <script nomodule be-itemized=director></script>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["director"]
    "readOnly": false,
  }'>
    export const itemLookup = async ({director}) => ({
      name: 'Steven Spielberg'
    })
```

does the same as above, except for itemprop=director

Example 3:

```html
  <script nomodule be-itemized='["name", "director"]'>
    ({name, director}) => {

    }
  </script>
```

is shorthand for:

```html
  <script nomodule be-itemized='{
    "editable": ["name", "director"]
  }'>
```

Now attaches two event handlers.

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




