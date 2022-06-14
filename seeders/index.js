require('dotenv').config({ path: './config/env/.env.dev' })
const { Product } = require('../models')
const products = require('./productSeeder')

;(async () => {
  await Product.destroy({ truncate: true })
  await Product.bulkCreate(products)
  process.exit()
})()
