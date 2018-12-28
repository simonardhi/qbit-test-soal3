var express = require('express');
var router = express.Router();

const data = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  next();
});

router.get('/api/datas', data.list);

module.exports = router;
