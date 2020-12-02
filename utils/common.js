/*
 * common.js 定义公共方法
 * clone() 克隆方法
 * checkParams() 校验参数方法
 * autoFn() 返回统一方法
 */

// 引入async模块 使用异步处理方法库
const async = require("async");

// 引入常量模块
const Constant = require("../constant/constant");
// 定义一个对象
const exportObj = {
  clone,
  checkParams,
  autoFn,
  getImgUrl,
};
// 导出对象，方便其他方法调用
module.exports = exportObj;

/*
 * 克隆方法，克隆一个对象
 * @param obj
 * @returns {any}
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/*
 * 校验参数全局方法
 * @param params 请求的参数集
 * @param checkArr 需要验证的参数
 * @param cb  回调函数
 */
function checkParams(params, checkArr, cb) {
  let flag = true;
  checkArr.forEach((v) => {
    if (!typeof params[v]) {
      flag = false;
    }
  });
  if (flag) {
    cb(null);
  } else {
    cb(Constant.LACK);
  }
}

/*
 * 返回统一方法，返回JSON格式数据
 * @param tasks 当前controller执行tasks
 * @param res 当前controller 响应值
 * @param resObj 当前controller 返回JSON对象
 * */
function autoFn(tasks, res, resObj) {
  async.auto(tasks, function (err) {
    if (!!err) {
      console.log(JSON.stringify(err));
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err),
      });
    } else {
      res.json(resObj);
    }
  });
}

/**
 * 获取图片url方法
 * @param req  请求对象
 * @param imgName  图片名称
 * @returns {string} 图片url
 */
function getImgUrl(req, imgName) {
  // 获取当前域名，用于组装图片路径
  const imgPath = req.protocol + "://" + req.get("host");

  if (!imgName) {
    return "";
  }
  return imgPath + "/upload/" + imgName;
}
