// 引入公共方法
const Common = require('../utils/common');

// 引入dict表的model
const DictModel = require('../models/dict');

// 引入常量
const Constant = require('../constant/constant');

// 引入dateformat包
const dateFormat = require('dateformat');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  list
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取字典列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 如果传入dropList参数，代表需要下拉列表，跳过分页逻辑
      if (req.query.dropList) {
        cb(null);
      }
    },
    // 查询方法，依赖校验参数方法
    query: [
      'checkParams',
      (results, cb) => {
        let searchOption;
        // 设定一个查询条件对象
        let whereCondition = {};
        // 如果查询字典名存在，查询对象增加字典名
        if (req.query.dname) {
          //whereCondition.username = req.query.username; //精确查询
          whereCondition.dname = {[Op.like]: `%${req.query.dname}%`}; //模糊查询
        }
        // 如果查询姓名存在，查询对象增加姓名
        if (req.query.mark) {
          whereCondition.mark = req.query.mark; //精确查询
          //whereCondition.mark = { [Op.like]: `%${req.query.mark}%` }; //模糊查询
        }
        if (req.query.dropList) {
          searchOption = {
            where: whereCondition,
            order: [['did', 'DESC']]
          };
        }
        // 通过offset和limit使用username的model去数据库中查询，并按照创建时间排序
        DictModel.findAndCountAll(searchOption)
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            //console.log(result);
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                did: v.did,
                mark: v.mark,
                dname: v.dname
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count
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
