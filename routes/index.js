var express = require('express');
var router = express.Router();
// 引入前台控制器
var indexCon = require('../controllers/indexCon');
/* GET home page. */
// 首页
router.get('/', indexCon.index)
// 列表页
router.get('/indexList/:_id', indexCon.indexList)
// 详情页
router.get('/indexsing/:_id', indexCon.indexsing)

module.exports = router;
