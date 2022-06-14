const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cartController')

router.get('/:memberId', cartController.getCartItems)
router.post('/checkout', cartController.cartCheckout)
router.post('/', cartController.createCart)

module.exports = router
