# be-itemized [TODO]

## Use case

Make itemscope adorned elements bindable in an easy way.

It is helpful to have a mental model of a typical use case this element decorator / behavior is attempting to assist with.  It might not be the most compelling use case in the world.  Still...

That use case is this:

Suppose we provide a web site where users can search for a movie.  When conducting the search, an API returning JSON provides details regarding the movie.  We want to bind to that JSON on the page.

We want our web site to be search engine optimized using existing standards, so we make use of the [itemscope attribute ("microdata")](https://www.semrush.com/blog/what-is-schema-beginner-s-guide-to-structured-data/).

And in addition, certain users with editing rights can do the same step as above, using the same exact steps, but then they can edit one or two of the  values.  As they edit the values, the values are saved to the database as a draft, so the editor can come back later (on a different device) and continue, before clicking on a save button which commits the changes so other users can see the edits.  

So the server provides the following HTML when the page first loads, to this super user.


```html
<input type=search name=search value=Avatar>
<button type=button data-fields='["genre", "trailer"]'>Edit</button>
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <button type=button>Save</button>
</div>
``` 

One could argue quite convincingly that the best way to implement this would be via a web component, which is all fine and good.  The case becomes strongest if the same UI is used elsewhere, either repeatedly on the same page, or in other contexts.  And many web component helper libraries provide perfectly good mechanisms to make this easy to implement.

But suppose neither of these scenarios are applicable, and we want to provide this ability in a less formal, more dynamic (perhaps) way.  But in a way that could be solidified with time into a reusable web component.

```html
<input type=search name=search value=Avatar be-fetching='{
        "for": ["https://movie-db.com/search?name=", "val"]
}'>
<button type=button data-fields='["genre", "trailer"]'>Edit</button>
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>Director:
    <span itemprop="director">James Cameron</span>
    (born August 16, 1954)</span>
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html"
    itemprop="trailer">Trailer</a>
  <button type=button be-noticed='{
    "tocoho": true,
    "prop": "beDecorated.itemized.commit",
    "fn": "onCommit"
  }'>Save</button>
  <script be-itemized='{
    "editableItemProps": {"observe": "button[data-fields]", "vft": "dataset.fields", "parseValAs": "object"},
    "model": {"observe": "input[type=search]", "homeInOn":"beDecorated.fetching.value", "vft": ".", "on": "value-changed"},
    "actionProps": ["commit"]
  }'>
    export const onEdit = await ({genre, trailer}) => {
      // save to draft
    };
    export const onCommit = await ({genre, trailer, commit}) => {
      // commit so others can see
    }
  </script>
  
</div>
```

What this does:

1.  Creates proxy and attaches it to oDiv.beDecorated.itemized  Gets initialized to {name: 'Avatar', director: 'James Cameron', genre: 'Science Fiction', trailer: '../movies/avatar-theatrical-trailer.html'}
2.  Subsequent changes to the proxy

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
    "args": {
      "name": {
        "observeClosest": "[itemscope]",
        "homeInOn": "beDecorated.$.itemprops.name",
        "vft": "textContent"
      }
    },
    "transform": {
      "nameI": {"contentEditable": true},
      "directorI": "director",
      "trailerI": "trailer",
      "genreI": "genre",
    }
  }'>
    export const itemLookup = async ({name}) => ({
      //await some lookup somewhere
      return {
        name: 'Jurassic Park',
        director: 'Steven Spielberg',
        genre: 'Science Fiction',
        trailer: 'https://www.youtube.com/watch?v=_jKEqDKpJLw'
      };
    });
  </script>
</div>
```

transform is autogenerated (by default), but only if not specified by the user.  



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




