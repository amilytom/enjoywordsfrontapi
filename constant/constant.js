// 定义一个返回对象
const obj = {
  // 默认请求成功
  DEFAULT_SUCCESS: {
    code: 10000,
    msg: "请求成功",
  },
  // 默认请求失败
  DEFAULT_ERROR: {
    code: 188,
    msg: "请求失败-系统错误",
  },
  // 定义错误返回-缺少必要参数
  LACK: {
    code: 199,
    msg: "缺少必要参数",
  },
  // 定义错误返回-Token验证失败
  TOKEN_ERROR: {
    code: 401,
    msg: "Token验证失败",
  },
  // 定义错误返回-服务器拒绝地址请求
  DEFAULT_REFUSE: {
    code: 403,
    msg: "禁止访问",
  },
  // 定义错误返回-无法找到文件
  DEFAULT_NotFOUND: {
    code: 404,
    msg: "无法找到文件",
  },
  // 定义错误返回-资源被禁止
  DEFAULT_NotALLOWED: {
    code: 405,
    msg: "资源被禁止",
  },
  // 定义错误返回-访问超时
  DEFAULT_TIMEOUT: {
    code: 504,
    msg: "访问超时",
  },
  // 定义错误返回-用户名或密码错误
  LOGIN_ERROR: {
    code: 101,
    msg: "用户名或密码错误",
  },
  // 定义错误返回-用户不存在
  USER_NOT_EXSIT: {
    code: 102,
    msg: "用户不存在",
  },
  // 定义错误返回-字典不存在
  DICT_NOT_EXSIT: {
    code: 103,
    msg: "字典不存在",
  },
  // 定义错误返回-班级不存在
  CLASS_NOT_EXSIT: {
    code: 104,
    msg: "班级不存在",
  },
  // 定义错误返回-教材不存在
  BOOK_NOT_EXSIT: {
    code: 105,
    msg: "教材不存在",
  },
  // 定义错误返回-单词不存在
  WORD_NOT_EXSIT: {
    code: 106,
    msg: "单词不存在",
  },
  // 定义错误返回-释义不存在
  MEAN_NOT_EXSIT: {
    code: 107,
    msg: "释义不存在",
  },
  // 定义错误返回-例句不存在
  CASE_NOT_EXSIT: {
    code: 108,
    msg: "例句不存在",
  },
  // 定义错误返回-训练不存在
  TRAIN_NOT_EXSIT: {
    code: 109,
    msg: "训练不存在",
  },
  // 定义错误返回-试卷不存在
  TEST_NOT_EXSIT: {
    code: 110,
    msg: "试卷不存在",
  },
  // 定义错误返回-错题不存在
  MISTAKE_NOT_EXSIT: {
    code: 111,
    msg: "错题不存在",
  },
  // 定义错误返回-单词教材不存在
  WORDBOOK_NOT_EXSIT: {
    code: 112,
    msg: "单词教材不存在",
  },
  // 定义错误返回-词性不存在
  SPEECH_NOT_EXSIT: {
    code: 113,
    msg: "词性不存在",
  },
  // 定义错误返回-保存文件失败
  SAVE_FILE_ERROR: {
    code: 114,
    msg: "保存文件失败",
  },
  // 定义错误返回-保存文件失败
  DEL_FILE_ERROR: {
    code: 115,
    msg: "删除文件失败",
  },
};
// 导出对象，给其他方法调用
module.exports = obj;
