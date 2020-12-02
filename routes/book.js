var express = require("express");
var router = express.Router();

// 引入自定义的教材controller
const BookController = require("../controllers/book");

// 定义单条教材路由，get请求
router.get("/", BookController.info);

module.exports = router;
