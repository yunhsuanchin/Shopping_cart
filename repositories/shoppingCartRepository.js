const { Shopping_cart } = require('../models')

class PrivateShoppingCartRepository {
  createCart (cartData) {
    return Shopping_cart.create(cartData)
  }
}

class ShoppingCartRepository {
  constructor () {
    throw new Error('Use ShoppingCartRepository.getInstance()')
  }

  static getInstance () {
    if (!ShoppingCartRepository.instance) {
      ShoppingCartRepository.instance = new PrivateShoppingCartRepository()
    }

    return ShoppingCartRepository.instance
  }
}

module.exports = ShoppingCartRepository.getInstance()
