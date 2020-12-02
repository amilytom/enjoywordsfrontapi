var express = require("express");
var router = express.Router();

// 引入multer模块
const multer = require("multer");
// 创建文件上传中间件
const uploadMiddleware = multer();

// 引入自定义的首页controller
const IndexController = require("../controllers/index");
// 定义登录路由，post请求
router.post("/login", IndexController.login);

// 定义注册路由，post请求
router.post("/regist", IndexController.regist);

// 定义上传图片路由，POST请求
router.post("/upload", uploadMiddleware.single("img"), IndexController.upload);

// 定义上传图片路由，delete请求
router.delete("/delfile", IndexController.delFile);

module.exports = router;
