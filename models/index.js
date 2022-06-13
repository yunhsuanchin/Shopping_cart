'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require(path.join(__dirname, '../config/config.js')).mysql
console.log(
  config,
  config.database,
  config.timezone,
  config.read.host,
  config.write.host
)
const db = {}

let sequelize = new Sequelize(config.database, null, null, {
  port: 3306,
  host: config.read.host,
  dialect: config.dialect,
  timezone: config.timezone,
  logging: false,
  replication: {
    read: {
      host: config.read.host,
      username: config.read.username,
      password: config.read.password
    },
    write: {
      host: config.write.host,
      username: config.write.username,
      password: config.write.password
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
