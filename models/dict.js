// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const Dict = seque.define(
  "Dict",
  {
    // 主键
    did: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 字典标识
    mark: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    // 字典名称
    dname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_dicts",
    createdAt: false,
    updatedAt: false,
  }
);

// 导出model
module.exports = Dict;
