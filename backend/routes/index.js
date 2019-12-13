var router = require('express').Router();
router.use('/', require('./addpoint')); 
router.use('/', require('./addproblem'));  
router.use('/', require('./getpoints'));  
module.exports = router; 