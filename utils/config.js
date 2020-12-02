// 默认开发环境dev配置
const config = {
  // 是否调试模式
  DEBUG: true,
  // MySQL数据库配置
  MYSQL: {
    host: "localhost",
    database: "vocabulary",
    username: "root",
    password: "246810",
    port: "3306",
  },
};

if (process.env.NODE_ENV === "production") {
  // 生产环境MySQL数据库配置
  config.MYSQL = {
    host: "193.112.136.226",
    database: "vocabulary",
    username: "root",
    password: "root",
    port: "3306",
  };
}
// 导出配置
module.exports = config;
