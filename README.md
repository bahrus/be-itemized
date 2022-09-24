# be-itemized [TODO]

Example 1:

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
    ({Avator, self}) => {
      //do some lookup somewhere
      const retrievedObject = {
        name: 'Jurassic Park',
        director: 'Steven Spielberg',
        genre: 'Science Fiction',
        trailer: 'https://www.youtube.com/watch?v=_jKEqDKpJLw'
      };
      self.assign(retrievedObject)
    }
  </script>
</div>
```




