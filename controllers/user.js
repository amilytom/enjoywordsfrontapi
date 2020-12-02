// 引入公共方法
const Common = require("../utils/common");

// 引入user表的model
const UserModel = require("../models/user");

// 引入字典表的model
const DictModel = require("../models/dict");

// 引入常量
const Constant = require("../constant/constant");

// 配置对象
let exportObj = {
  update,
  updatePwd,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 修改用户方法
function update(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["uid", "name"], cb);
    },
    // 更新方法，依赖校验参数方法
    update: (cb) => {
      // 使用user的model中的方法更新
      UserModel.update(
        {
          name: req.body.name,
          stage: req.body.stage ? req.body.stage : 0,
          grade: req.body.grade ? req.body.grade : 0,
          term: req.body.term ? req.body.term : 0,
        },
        {
          where: {
            uid: req.body.uid,
          },
        }
      )
        .then(function (result) {
          // 更新结果处理
          if (result[0]) {
            // 如果更新成功
            // 继续后续操作
            cb(null);
          } else {
            // 更新失败，传递错误信息到async最终方法
            cb(Constant.USER_NOT_EXSIT);
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
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 修改用户密码
function updatePwd(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["uid", "password"], cb);
    },
    // 更新方法，依赖校验参数方法
    update: (cb) => {
      // 使用user的model中的方法更新
      UserModel.update(
        {
          password: req.body.password,
        },
        {
          where: {
            uid: req.body.uid,
          },
        }
      )
        .then(function (result) {
          // 更新结果处理
          if (result[0]) {
            // 如果更新成功
            // 继续后续操作
            cb(null);
          } else {
            // 更新失败，传递错误信息到async最终方法
            cb(Constant.USER_NOT_EXSIT);
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
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
