import Y from 'yjs'
import yArray from 'y-array'
import yWebsocketsClient from 'y-websockets-client'
import yMemory from 'y-memory'
import yMap from 'y-map'
import yText from 'y-text'
yArray(Y)
yWebsocketsClient(Y)
yMemory(Y)
yMap(Y)
yText(Y)

import { select, mouse as d3Mouse } from 'd3-selection'
import { drag as d3Drag } from 'd3-drag'
import 'd3-transition'

window.d3Drag = d3Drag

/* 
  below this point, the code is pretty much the same as the original example.
  The only changes are to accomodate the changes from version 3 to version 4 of
  d3, and the way it works when you import the d3 modules separately.
*/

//initialize a shared object. This function call returns a promise!
Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'websockets-client',
    room: 'Puzzle-example'
  },
  share: {
    piece1: 'Map',
    piece2: 'Map',
    piece3: 'Map',
    piece4: 'Map'
  }
}).then(function (y) {
  window.yJigsaw = y
  var origin // mouse start position - translation of piece  
  var drag = d3Drag()
    .on('start', function (params) {
      // get the translation of the element
      var translation = select(this).attr('transform').slice(10,-1).split(',').map(Number)
      // mouse coordinates
      var mouse = d3Mouse(this.parentNode)
      origin = {
        x: mouse[0] - translation[0],
        y: mouse[1] - translation[1]
      }
    })
    .on("drag", function(){
      var mouse = d3Mouse(this.parentNode)
      var x = mouse[0] - origin.x // =^= mouse - mouse at dragstart + translation at dragstart
      var y = mouse[1] - origin.y
      select(this).attr("transform", "translate(" + x + "," + y + ")")
    })
    .on('end', function (piece, i) {
      // save the current translation of the puzzle piece
      var mouse = d3Mouse(this.parentNode)
      var x = mouse[0] - origin.x
      var y = mouse[1] - origin.y
      piece.set('translation', {x: x, y: y})
    })

  var data = [y.share.piece1, y.share.piece2, y.share.piece3, y.share.piece4]
  var pieces = select(document.querySelector("#puzzle-example")).selectAll("path").data(data)

  pieces
    .classed('draggable', true)
    .attr("transform", function (piece) {
      var translation = piece.get('translation') || {x: 0, y: 0}
      return "translate(" + translation.x + "," + translation.y + ")"
    }).call(drag)

  data.forEach(function(piece){
    piece.observe(function () {
      // whenever a property of a piece changes, update the translation of the pieces
      pieces
        .transition()
        .attr("transform", function (piece) {
          var translation = piece.get('translation') || {x: 0, y: 0}
          return "translate(" + translation.x + "," + translation.y + ")"
        })
    })
  })
})