// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const ClassMode = require("./class");

// 定义model
const Book = seque.define(
  "Book",
  {
    // 主键
    bid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 教材名称
    bname: {
      type: Sequelize.STRING(90),
      allowNull: false,
    },
    // 班级ID
    classid: {
      type: Sequelize.STRING(90),
      allowNull: false,
    },
    // 封面图片
    cover: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_textbook",
  }
);

// 导出model
module.exports = Book;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Book.belongsTo(ClassMode, {
  foreignKey: "classid",
  constraints: false,
});
