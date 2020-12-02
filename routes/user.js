var express = require("express");
var router = express.Router();

// 引入自定义的用户controller
const UserController = require("../controllers/user");

// 定义修改用户路由，put请求
router.put("/", UserController.update);
// 定义更改用户密码路由，put请求
router.put("/pwd", UserController.updatePwd);

module.exports = router;
