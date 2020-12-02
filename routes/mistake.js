var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const MistakeController = require("../controllers/mistake");

// 定义单词列表路由，get请求
router.get("/", MistakeController.list);
// 定义单条单词路由，get请求
router.get("/:mid", MistakeController.info);
// 定义添加单词路由，post请求
router.post("/", MistakeController.add);
// 定义修改单词路由，put请求
router.put("/", MistakeController.update);
// 定义删除单词路由，delete请求
router.delete("/", MistakeController.remove);

module.exports = router;
