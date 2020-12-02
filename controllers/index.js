// 引入公共方法
const Common = require('../utils/common');

// 引入admin表的model
const UserModel = require('../models/user');

// 引入常量
const Constant = require('../constant/constant');

// 引入dateformat包
const dateFormat = require('dateformat');

// 引入Token处理方法
const Token = require('../utils/token');

// 设定默认Token过期时间，单位s
const TOKEN_EXPIRE_SENCOND = 36000;

// 引入fs模块，用于操作文件
const fs = require('fs');
// 引入path模块，用于操作文件路径
const path = require('path');

// 配置对象
let exportObj = {
  login,
  regist,
  upload,
  delFile
};
// 导出对象，供其它模块调用
module.exports = exportObj;

//登录方法
function login(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ['username', 'password'], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      'checkParams',
      (results, cb) => {
        // 通过用户名和密码去数据库中查询
        UserModel.findOne({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
          .then(function (result) {
            // 查询结果处理
            if (result) {
              // 如果查询到了结果
              // 组装数据，将查询结果组装到成功返回的数据中
              resObj.data = {
                uid: result.uid,
                username: result.username,
                name: result.name,
                lastLoginAt: dateFormat(
                  result.lastLoginAt,
                  'yyyy-mm-dd HH:MM:ss'
                ),
                createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
              };
              // 将user的uid保存在Token中
              const adminInfo = {
                uid: result.uid
              };
              // 生成Token
              let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND);
              // 将Token保存在返回对象中，返回前端
              resObj.data.token = token;
              // 继续后续操作，传递admin的uid参数
              cb(null, result.uid);
            } else {
              // 没有查询到结果，传递错误信息到async最终方法
              cb(Constant.LOGIN_ERROR);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
    // 写入上次登录日期
    writeLastLoginAt: [
      'query',
      (results, cb) => {
        // 获取前面传递过来的参数admin的id
        let userId = results['query'];
        // 通过id查询，将当前时间更新到数据库中的上次登录时间
        UserModel.update(
          {
            lastLoginAt: new Date()
          },
          {
            where: {
              uid: userId
            }
          }
        )
          .then(function (result) {
            // 更新结果处理
            if (result) {
              // 更新成功，则继续后续操作
              cb(null);
            } else {
              // 更新失败，传递错误信息到async最终方法
              cb(Constant.DEFAULT_ERROR);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 添加用户方法
function regist(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(
        req.body,
        ['username', 'password', 'name', 'stage', 'grade', 'term'],
        cb
      );
    },
    // 添加方法，依赖校验参数方法
    add: (cb) => {
      // 使用admin的model中的方法插入到数据库
      UserModel.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        stage: req.body.stage,
        grade: req.body.grade,
        term: req.body.term
      })
        .then(function (result) {
          // 插入结果处理
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 上传图片方法
function upload(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.file, ['originalname'], cb);
    },
    // 查询方法，依赖校验参数方法
    save: [
      'checkParams',
      (results, cb) => {
        // 获取上传文件的扩展名
        let lastIndex = req.file.originalname.lastIndexOf('.');
        let extension = req.file.originalname.substr(lastIndex - 1);
        // 使用时间戳作为新文件名
        let fileName = new Date().getTime() + extension;
        console.log(fileName);
        // 保存文件，用新文件名写入
        // 三个参数
        // 1.图片的绝对路径
        // 2.写入的内容
        // 3.回调函数
        fs.writeFile(
          path.join(__dirname, '../public/upload/' + fileName),
          req.file.buffer,
          (err) => {
            // 保存文件出错
            if (err) {
              cb(Constant.SAVE_FILE_ERROR);
            } else {
              resObj.data = {
                // 返回文件名
                fileName: fileName,
                // 通过公共方法getImgUrl拼接图片路径
                path: Common.getImgUrl(req, fileName)
              };
              cb(null);
            }
          }
        );
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 删除上传的文件
function delFile(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ['filename'], cb);
    },
    // 查询方法，依赖校验参数方法
    remove: [
      'checkParams',
      (results, cb) => {
        let fileName = req.body.filename;
        let filepath = path.join(__dirname, '../public/upload/' + fileName);
        fs.unlink(filepath, (err) => {
          if (err) {
            cb(Constant.DEL_FILE_ERROR);
          } else {
            cb(null);
          }
        });
      }
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
