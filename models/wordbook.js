// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const WordModel = require("./word");

const BookModel = require("./book");

// 定义model
const Wordbook = seque.define(
  "Wordbook",
  {
    // 主键
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 教材ID
    bookid: {
      type: Sequelize.INTEGER,
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
    tableName: "stu_wordbook",
    createdAt: false,
    updatedAt: false,
  }
);

// 导出model
module.exports = Wordbook;

// WordModel.belongsToMany(BookModel, {
//   through: {
//     model: Wordbook,
//     unique: false,
//   },
//   foreignKey: "wordid", //通过外键wid
//   constraints: false,
// });
// BookModel.belongsToMany(WordModel, {
//   through: {
//     model: Wordbook,
//     unique: false,
//   },
//   foreignKey: "bookid", //通过外键bid
//   constraints: false,
// });

// BelongsTo关联表示一对一关系的外键存在于源模型。
Wordbook.belongsTo(WordModel, {
  foreignKey: "wordid",
  constraints: false,
});

// BelongsTo关联表示一对多关系的外键存在于源模型。
Wordbook.belongsTo(BookModel, {
  foreignKey: "bookid",
  constraints: false,
});
