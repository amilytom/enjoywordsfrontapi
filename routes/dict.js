var express = require('express');
var router = express.Router();

// 引入自定义的字典controller
const DictController = require('../controllers/dict');

// 定义字典列表路由，get请求
router.get('/', DictController.list);

module.exports = router;
