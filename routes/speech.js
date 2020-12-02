var express = require('express');
var router = express.Router();

// 引入自定义的词性controller
const SpeechController = require('../controllers/speech');

// 定义单条词性路由，get请求
router.get('/:pid', SpeechController.info);

module.exports = router;
