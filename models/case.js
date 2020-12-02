// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 引入单词表的model
const WordModel = require("./word");

// 引入词性表的model
const SpeechModel = require("./speech");

// 定义model
const Case = seque.define(
  "Case",
  {
    // 主键
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 单词ID
    wordid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 例句
    example: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 语音
    voice: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // 翻译
    translation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    // 词性ID
    posid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_cases",
  }
);

// 导出model
module.exports = Case;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Case.belongsTo(SpeechModel, {
  foreignKey: "posid",
  constraints: false,
});

// BelongsTo关联表示一对多关系的外键存在于源模型。
Case.belongsTo(WordModel, {
  foreignKey: "wordid",
  constraints: false,
});
