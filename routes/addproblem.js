const router = require('express').Router();
const Problem = require('../models/problem');
const multer = require('multer');
const fs = require('fs');
const Point = require('../models/point');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})

var upload = multer({ storage: storage }).array('files', 6);

router.post('/add_problem', (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  let obj;
    for(var key in req.body) {
       obj = JSON.parse(key);
    }
        var problem = new Problem({
          category: obj.category,
          description: obj.description,
          latitude: obj.latitude,
          longitude: obj.longitude,
          title: obj.title,
          img: {data: obj.image},
          date: Date.now(),
        })
        var point = new Point({
          latitude: obj.latitude,
          longitude: obj.longitude,
        });
        point.save().then((resp) => {
        }).catch(err => {
          return res.json({"error" : err});
    })
        problem.save().then((resp) => {
          return res.json({id: resp._id});
        }).catch(err => {
          return err;
      })
});

router.post('/add_problems', (req, res) => {
  for(let i = 0; i < req.body.length; i++) {
    let new_problem;
    let point;
    if(req.body[i].category && req.body[i].latitude && req.body[i].longitude > -180 && req.body[i].longitude < 180 && req.body[i].title &&
      req.body[i].latitude > -90 && req.body[i].latitude < 90) {
      new_problem = new Problem({
        category: req.body[i].category,
        description: req.body[i].description,
        latitude: req.body[i].latitude,
        longitude: req.body[i].longitude,
        title: req.body[i].title,
        img: {data: req.body[i].image},
        date: Date.now(),
      });
      point = new Point({
        latitude: req.body[i].latitude,
        longitude: req.body[i].longitude,
      }); 
      new_problem.save().then(() => {
        point.save().then(() => {
        })
      }).catch((err) => {
        return res.json({'message': 'mi ban en chi'})
      })
    }
    else continue;
  }
  return res.json({'message': 'lriv fayliny pahec'});
})
router.post('/upload_file', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    else {
      return res.json({'message': 'image uploaded'});
    }
  })
});

module.exports = router;  
