if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './config/env/.env.prod' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/env/.env.dev' })
} else {
  // development and release
  require('dotenv').config({
    path: path.resolve(__dirname, './config/env/.env.dev')
  })
}
const db = require('../models')

const { Product, Member } = require('../models')
const products = require('./productSeeder')
const members = require('./memberSeeder')

;(async () => {
  await db.sequelize.sync()

  await Promise.all([
    Product.destroy({ truncate: true }),
    Member.destroy({ truncate: true })
  ])
  await Promise.all([Product.bulkCreate(products), Member.bulkCreate(members)])

  process.exit()
})()
