Yjs jigsaw example with es6 imports
-----------------------------------

The Yjs jigsaw example rewritten using es6 import statements. Babel translates 
the code, and webpack packs it up. To run the example

```
git clone https://github.com/lukebarlow/yjs-jigsaw-es6-imports.git
cd yjs-jigsaw-es6-imports
npm import
npm start
```

Then open localhost:3001 in your browser. To build everything into a single
javascript file

```
npm run build
```

Then take the file `dist/jigsaw.js`.


A couple of Yjs specific lines were needed in the webpack configuration

```
plugins: [
  new webpack.IgnorePlugin(/SpecHelper/),
  new webpack.IgnorePlugin(/.*\.md/),
]
```