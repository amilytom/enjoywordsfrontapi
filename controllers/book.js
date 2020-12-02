// 引入公共方法
const Common = require("../utils/common");

// 引入bool表的model
const BookModel = require("../models/book");
//引入class表的model
const ClassModel = require("../models/class");

// 引入常量
const Constant = require("../constant/constant");

// 引入dateformat包
const dateFormat = require("dateformat");

// 配置对象
let exportObj = {
  info,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 通过classid获取教材方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["classid"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        let whereCondition = {
          classid: req.query.classid,
        };
        let searchOption = {
          where: whereCondition,
        };
        // 使用admin的model中的方法查询
        BookModel.findAndCountAll(searchOption)
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            let list = [];
            result.rows.forEach((v, i) => {
              let obj = {
                bid: v.bid,
                bname: v.bname,
                classid: v.classid,
                cover: v.cover,
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 将查询到的结果给返回对象赋值
            resObj.data = {
              list,
              count: result.count,
            };
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
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
