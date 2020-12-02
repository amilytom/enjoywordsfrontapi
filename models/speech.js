// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const Speech = seque.define(
  "Speech",
  {
    // 主键
    pid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 词性缩写
    pos: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    // 词性
    speech: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    // 词性名称
    posname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 词性类型
    type: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_speech",
    createdAt: false,
    updatedAt: false,
  }
);

// 导出model
module.exports = Speech;
