const router = require('express').Router();
const Problem = require('../models/problem');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

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
        problem.save().then((resp)=>{
          res.json({id: resp._id});
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
    if(req.file) {
      problem.img.data = fs.readFileSync(req.file.path);
      problem.save().then(() => console.log('Saved')).catch(err => {
        console.log(err);
      })
    }
  })
})
})

module.exports = router;  