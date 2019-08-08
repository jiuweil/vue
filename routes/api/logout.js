var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('logout');
  delete req.session['1905_session'];
  res.send({err:0,msg:'注销成功'})
});

module.exports = router;
