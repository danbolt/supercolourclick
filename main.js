var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://daniel:daniel@localhost:5432/daniel');

var express = require('express');
var app = express();

var grid = require('./grid/grid.js')(sequelize);

app.use('/grid', grid);

app.get('/', function (req, res) {
  res.send('Hello, face');
});

var server = app.listen(8080, function() {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});
