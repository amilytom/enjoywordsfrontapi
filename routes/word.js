var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const WordController = require("../controllers/word");

// 定义单词列表路由，get请求
router.get("/", WordController.list);
// 定义单条单词路由，get请求
router.get("/:wid", WordController.info);

module.exports = router;
