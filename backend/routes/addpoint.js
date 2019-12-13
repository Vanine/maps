var router = require('express').Router();
var Point = require('../models/point');

router.post('/add_point', (req, res) => {
  let obj;
    for(var key in req.body) {
       obj = JSON.parse(key)
        }
        var newPoint = new Point({
          latitude: obj.latitude,
          longitude: obj.longitude,
          frequency: 1
        });
        Point.findOne({latitude: newPoint.latitude, longitude: newPoint.longitude})
        .then(point => {
          if(point) {
            point.frequency++;
            point.save().then(() => {
              return res.sendStatus(201);
            })
            .catch(err => {throw err});
          }
          else {
            newPoint.save().then(() => {
            return res.sendStatus(200);
            })
          }
        });
      });

module.exports = router;