// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const TrainModel = require("./train");

// 定义model
const Mistake = seque.define(
  "Mistake",
  {
    // 主键
    mid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 训练ID
    labelid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 错误次数
    errnum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 题目名称
    question: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 正确答案
    answer: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 用户解答
    respon: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 是否修正
    isamend: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_mistake",
  }
);

// 导出model
module.exports = Mistake;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Mistake.belongsTo(TrainModel, {
  foreignKey: "labelid",
  constraints: false,
});
