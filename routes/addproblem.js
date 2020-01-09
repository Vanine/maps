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
  cb(null, Date.now() + '-' +file.originalname )
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
router.post('/upload_file/:id', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }

    Problem.findOne({_id: req.params.id}).then(problem => {
      if(problem) {
        let images = [];
        req.files.forEach((file, index) => {
          let image = fs.readFileSync(file.path);
          images.push(image);
        })
        problem.img.data = images;
        problem.save().then(() => {}).catch(err => {
          return err;
      })
      } 
    })
  })
 return res.json({'message': 'ok'});
})

module.exports = router;  
