require('dotenv').config({ path: './config/env/.env.dev' })
const { Product, Member } = require('../models')
const products = require('./productSeeder')
const members = require('./memberSeeder')

console.log('members', members)
;(async () => {
  await Promise.all([
    Product.destroy({ truncate: true }),
    Member.destroy({ truncate: true })
  ])
  await Promise.all([Product.bulkCreate(products), Member.bulkCreate(members)])

  process.exit()
})()
