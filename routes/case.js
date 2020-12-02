var express = require('express');
var router = express.Router();

// 引入自定义的单词controller
const CaseController = require('../controllers/case');

// 定义单词列表路由，get请求
router.get('/', CaseController.list);
// 定义单条单词路由，get请求
router.get('/:id', CaseController.info);

module.exports = router;
