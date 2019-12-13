var router = require('express').Router();
var Point = require('../models/point');

router.get('/points', (req, res) => {
  Point.find({}, function(err, points) {
    res.json({points: points});
  })
})

module.exports = router;