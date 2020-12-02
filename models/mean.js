// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 引入单词表的model
const WordModel = require("./word");

// 引入词性表的model
const SpeechModel = require("./speech");

// 定义model
const Mean = seque.define(
  "Mean",
  {
    // 主键
    mid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 词性ID
    posid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 释义
    mean: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 单词ID
    wordid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_means",
  }
);

// 导出model
module.exports = Mean;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Mean.belongsTo(SpeechModel, {
  foreignKey: "posid",
  constraints: false,
});

// BelongsTo关联表示一对多关系的外键存在于源模型。
Mean.belongsTo(WordModel, {
  foreignKey: "wordid",
  constraints: false,
});
