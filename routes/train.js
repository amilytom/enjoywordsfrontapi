var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const TrainController = require("../controllers/train");

// 定义单词列表路由，get请求
router.get("/", TrainController.list);
// 定义单条单词路由，get请求
router.get("/:eid", TrainController.info);

module.exports = router;
