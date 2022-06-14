const { Cart_item } = require('../models')

class PrivateCartItemRepository {
  async updateCartItems (cartItems) {
    await Cart_item.destroy({ where: { cart_id: cartItems[0].cart_id } })
    return Cart_item.bulkCreate(cartItems)
  }
}

class CartItemRepository {
  constructor () {
    throw new Error('Use CartItemRepository.getInstance()')
  }

  static getInstance () {
    if (!CartItemRepository.instance) {
      CartItemRepository.instance = new PrivateCartItemRepository()
    }

    return CartItemRepository.instance
  }
}

module.exports = CartItemRepository.getInstance()
