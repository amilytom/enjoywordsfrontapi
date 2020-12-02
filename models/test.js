// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const TrainModel = require("./train");

// 定义model
const Test = seque.define(
  "Test",
  {
    // 主键
    tid: {
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
      allowNull: true,
    },
    // 是否正确
    isright: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 题目描述
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_testpaper",
  }
);

// 导出model
module.exports = Test;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Test.belongsTo(TrainModel, {
  foreignKey: "labelid",
  constraints: false,
});
