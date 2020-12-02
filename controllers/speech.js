// 引入公共方法
const Common = require('../utils/common');

// 引入Class表的model
const SpeechModel = require('../models/speech');

// 引入常量
const Constant = require('../constant/constant');

// 引入dateformat包
const dateFormat = require('dateformat');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  info
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取单条单词教材方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ['pid'], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      'checkParams',
      (results, cb) => {
        // 使用admin的model中的方法查询
        SpeechModel.findByPk(req.params.pid, {})
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                pid: result.pid,
                pos: result.pos,
                speech: result.speech,
                posname: result.posname,
                type: result.type
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.SPEECH_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      }
    ]
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
