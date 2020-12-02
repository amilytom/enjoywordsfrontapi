var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const TestController = require("../controllers/test");

// 定义单词列表路由，get请求
router.get("/", TestController.list);
// 定义单条单词路由，get请求
router.get("/:tid", TestController.info);

module.exports = router;
