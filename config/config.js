module.exports = {
  mysql: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'shopline',
    dialect: 'mysql',
    timezone: '+08:00'
  }
}
