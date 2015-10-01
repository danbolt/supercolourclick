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
    var x = parseInt(req.query.x, 10);
    var y = parseInt(req.query.y, 10);
    var revision = parseInt(req.query.revision, 10);

    // ensure the x and y coordinates are actual numbers; if not, return an error
    if (isNaN(x)) {
      res.status(400).send('x coordinate is not a number');
      return;
    }
    if (isNaN(y)) {
      res.status(400).send('y coordinate is not a number');
      return;
    }

    // if the number is outside the grid, return an error
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      res.status(400).send('outside of grid');
      return;
    }

    // if the color param is not a real colour, return an error
    if (!(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(req.query.color))) {
      res.status(400).send('bad color string');
      return;
    }

    // ensure the revision number is an actual number before you do a DB query
    if (isNaN(revision)) {
      res.status(400).send('improper revision number');
      return;
    }

    grid.findOne({where: {name: 'main-game'}}).then(function (grid) {
      if (revision !== parseInt(grid.revisionNumber)) {
        res.status(400).send('revision number is not to-date');
        return;
      }

      grid.revisionNumber = (parseInt(grid.revisionNumber) + 1).toString();
      grid.grid[y * 10 + x] = req.query.color;

      grid.save({fields: ['revisionNumber', 'grid']}).then(function() {
        res.send('saved');
      }).catch(function () {
        res.status(500).send('error saving update');
      });
    });
  });

  router.get('/about', function (req, res) {
    res.send('This is responsible for the grid.');
  });

  return router;
};