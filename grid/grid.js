var Sequelize = require('sequelize');
var express = require('express'); 

module.exports = function(seqelize) {
  var router = express.Router();

  var grid = seqelize.define('grid', {
    name: Sequelize.STRING,
    revisionNumber: Sequelize.BIGINT,
    grid: Sequelize.ARRAY(Sequelize.STRING)
  });

  seqelize.sync();

  grid.findOrCreate({where: {name: 'main-game'}, defaults: {revisionNumber: 0, grid: [
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000'
    ]}});

  router.get('/', function (req, res) {
    grid.findOne({where: {name: 'main-game'}}).then(function(gridData) {
      
      res.json({
        revision: gridData.revisionNumber,
        data: gridData.grid
      });
    });
  });

  router.post('/', function(req, res) {
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);

    // if the number is outside the grid, don't do it
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      res.status(400).send('outside of grid');
      return;
    }

    console.log(req.query);

    if (!(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(req.query.color))) {
      res.status(400).send('bad color string');
      return;
    }

    res.send('feature not finished yet');
  });

  router.get('/about', function (req, res) {
    res.send('This is responsible for the grid.');
  });

  return router;
};