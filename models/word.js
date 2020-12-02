// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const BookModel = require("../models/book");
const WordbookModel = require("../models/wordbook");

// 定义model
const Word = seque.define(
  "Word",
  {
    // 主键
    wid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 单词
    word: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    // 拼写
    spell: {
      type: Sequelize.STRING(90),
      allowNull: false,
    },
    // 音调
    voice: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    // 单复数
    plural: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    // 现在时
    doing: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    // 过去式
    done: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_words",
  }
);

// 导出model
module.exports = Word;

// Word.belongsToMany(BookModel, {
//   through: {
//     model: WordbookModel,
//     unique: false,
//   },
//   foreignKey: "wordid", //通过外键wid
//   constraints: false,
// });
// BookModel.belongsToMany(Word, {
//   through: {
//     model: WordbookModel,
//     unique: false,
//   },
//   foreignKey: "bookid", //通过外键bid
//   constraints: false,
// });
