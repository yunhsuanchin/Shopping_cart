'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require(__dirname + '/../config/config.js')['mysql']
const db = {}

let sequelize = new Sequelize(config.database, null, null, {
  dialect: config.dialect,
  timezone: config.timezone,
  replication: {
    read: {
      host: config.host,
      username: config.username,
      password: config.password
    },
    write: {
      host: config.host,
      username: config.username,
      password: config.password
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
