var path = require('path');
var fs = require('fs');
var underscore = require('underscore');
var buffertools = require('buffertools').extend(); //extend Node's buffer class for additional functionality

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://daniel:daniel@localhost:5432/daniel');

var express = require('express');
var app = express();

var grid = require('./grid/grid.js')(sequelize);

var generateGridView = function(gridData) {
  var data = new Buffer('');

  for (var i = 0; i < 100; i++) {
    if (i % 10 === 0) {
      data = data.concat('<tr>');
    }

    data = data.concat('<td bgcolor="' + gridData.grid[i] + '" class="square" id="' + (i % 10) + '-' + ~~(i / 10) + '"></td>');

    if (i % 10 === 9) {
      data = data.concat('</tr>');
    }
  }

  return data;
};

app.use('/grid', grid);

app.get('/', function (req, res) {
  var a = fs.readFile('./view/index.html', function(err, dataA)
  {
    if (err) {
      res.send('DataA error: ' + err);
    }

    var b = fs.readFile('./view/indexB.html', function (err2, dataB) {
      if (err2) {
        res.send('DataB error: ' + err);
      }

      grid.getGridJSONData(function(gridData) {
        var result = dataA.concat(generateGridView(gridData), dataB);
        res.send(result.toString().replace('revisionNumber = undefined', 'revisionNumber = ' + gridData.revisionNumber));
      });
    });
  });
});

var server = app.listen(8080, function() {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});
