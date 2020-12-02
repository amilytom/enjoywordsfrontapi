var express = require('express');
var router = express.Router();

// 引入自定义的班级controller
const ClassController = require('../controllers/class');

// 定义单条班级路由，get请求
router.get('/', ClassController.info);

module.exports = router;
