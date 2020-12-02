// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

const DictModel = require("./dict");

// 定义model
const Train = seque.define(
  "Train",
  {
    // 主键
    eid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 训练标签
    label: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    // 用户ID
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 训练类别ID
    forum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 分数
    score: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 总分
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 正确数目
    right: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 错误数目
    wrong: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 是否完成
    isover: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_train",
  }
);

// 导出model
module.exports = Train;

// BelongsTo关联表示一对一关系的外键存在于源模型。
Train.belongsTo(DictModel, {
  foreignKey: "forum",
  constraints: false,
});
