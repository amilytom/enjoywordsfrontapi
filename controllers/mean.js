// 引入公共方法
const Common = require("../utils/common");

// 引入mean表的model
const MeanModel = require("../models/mean");

// 引入单词表的model
const WordModel = require("../models/word");

// 引入词性表的model
const SpeechModel = require("../models/speech");

// 引入常量
const Constant = require("../constant/constant");

// 引入dateformat包
const dateFormat = require("dateformat");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  list,
  info,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取单词教材列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, ["page", "rows"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0;
        // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
        let limit = parseInt(req.query.rows) || 20;
        // 设定一个查询条件对象
        let whereCondition = {};
        // 如果查询单词教材名存在，查询对象增加单词教材名
        if (req.query.mean) {
          //whereCondition.mean = req.query.mean; //精确查询
          whereCondition.mean = { [Op.like]: `%${req.query.mean}%` }; //模糊查询
        }
        // if (req.query.word) {
        //   //whereCondition.word = req.query.word; //精确查询
        //   whereCondition.word = { [Op.like]: `%${req.query.word}%` }; //模糊查询
        // }
        // 通过offset和limit使用model去数据库中查询，并按照创建时间排序
        MeanModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [["created_at", "DESC"]],
          include: [
            {
              model: WordModel,
              attributes: ["word"],
              where: {
                word: { [Op.like]: `%${req.query.word}%` },
              },
            },
            {
              model: SpeechModel,
              attributes: ["pos", "posname"],
            },
          ],
          raw: true,
        })
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            //console.log(result);
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                mid: v.mid,
                posid: v.posid,
                pos: v["Speech.pos"],
                posname: v["Speech.posname"],
                wordid: v.wordid,
                word: v["Word.word"],
                mean: v.mean,
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
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

// 获取单条单词教材方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["mid"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用admin的model中的方法查询
        MeanModel.findByPk(req.params.mid, {})
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                mid: result.mid,
                posid: result.posid,
                mean: result.mean,
                wordid: result.wordid,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.MEAN_NOT_EXSIT);
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
