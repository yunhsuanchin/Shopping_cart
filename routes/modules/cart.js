const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cartController')

router.get('/:cartId', cartController.getCartItems)
router.post('/:cartId/checkout', cartController.cartCheckout)
router.post('/', cartController.createCart)

module.exports = router
