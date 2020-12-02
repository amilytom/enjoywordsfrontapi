/*
 * verify.js Token验证中间件
 * 定义verifyToken()方法 统一验证Token
 * */

// 引入Token处理的controller
const Token = require("./token");
// 引入常量
const Constant = require("../constant/constant");

// 配置中间对象
const exportObj = {
  verifyToken,
};
// 导出对象，供其他模块调用
module.exports = exportObj;

/*
 * 验证Token中间件的方法 verifyToken
 * @param req 客户端请求
 * @param res 服务器响应
 * @param next() 运行下一个函数
 * */
function verifyToken(req, res, next) {
  // 如果请求路径是/login,即登录页，则跳过，继续下一步
  if (req.path === "/login") return next();
  // 从请求投中获取参数token
  let token = req.headers.token;
  // 调用TokenController中的Token解密方法，对参数token进行解密
  let tokenverifyObj = Token.decrypt(token);
  if (tokenverifyObj.token) {
    next(); // 如果Token 验证通过，则继续下一步
  } else {
    // 如果Token验证不通过，则返回错误JSON
    res.json(Constant.TOKEN_ERROR);
  }
}
