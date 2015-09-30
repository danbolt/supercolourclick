var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('');
});

router.get('/about', function (req, res) {
  res.send('This is responsible for the grid.');
});

module.exports = router;