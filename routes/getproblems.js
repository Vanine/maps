var router = require('express').Router();
var Problem = require('../models/problem');

router.get('/problems', (req, res) => {
  Problem.find({}, function(err, points) {
    res.json({points: points});
  })
})

module.exports = router;