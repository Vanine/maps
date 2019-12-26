var router = require('express').Router();
router.use('/', require('./addproblem'));  
router.use('/', require('./getpoints'));  
router.use('/', require('./getproblems'));  

module.exports = router; 