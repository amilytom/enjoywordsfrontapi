/*
 * token 令牌 定义两个公共方法
 * 加密Token方法 encrypt
 * 解密Token方法 decrypt
 * */

// 引入jsonwebtoken包 生成token及验证
const jwt = require('jsonwebtoken');
// 设定一个密匙，用来加密和解密Token
const tokenkey = 'erqwd8_05cW7!@50ETnkdF9zo#W7!@50ETnk';

// 定义一个对象
const Token = {
  /*
   * Token 加密方法
   * @param data 需要加密在Token中的数据
   * @param time Token的过期时间，单位为s
   * @returns {*} 返回一个Token
   */
  encrypt: function (data, time) {
    return jwt.sign(data, tokenkey, {expiresIn: time});
  },

  /*
   * Token 解密方法
   * @param token 加密之后的Token
   * @returns 返回对象
   * {{token: boolean(true表示Token合法，false则表示不合法),
   * data: *(解密出来的数据或者错误信息) }}
   * */
  decrypt: function (token) {
    try {
      let data = jwt.verify(token, tokenkey);
      return {
        token: true,
        data: data
      };
    } catch (e) {
      return {
        token: false,
        data: e
      };
    }
  },
};

// 导出Token对象，方便其他模块调用
module.exports = Token;
