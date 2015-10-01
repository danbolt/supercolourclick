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
    res.send('feature not compelte yet');
  });

  router.get('/about', function (req, res) {
    res.send('This is responsible for the grid.');
  });

  return router;
};