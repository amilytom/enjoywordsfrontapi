// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const Class = seque.define(
  "Class",
  {
    // 主键
    cid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 学段
    stage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 年级
    grade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 学期
    term: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 班级名称
    cname: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_class",
    createdAt: false,
    updatedAt: false,
  }
);

// 导出model
module.exports = Class;
