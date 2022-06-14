const express = require('express')
const router = express.Router()
const cart = require('./modules/cart')

router.use('/cart', cart)

module.exports = router
