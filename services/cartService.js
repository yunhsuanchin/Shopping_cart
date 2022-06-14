class PrivateCartService {
  constructor () {}

  getCart (cartId) {}

  createCart (cartData) {}
}

class CartService {
  constructor () {
    throw new Error('Use CartService.getInstance()')
  }

  static getInstance () {
    if (!CartService.instance) {
      CartService.instance = new PrivateCartService()
    }

    return CartService.instance
  }
}

module.exports = CartService.getInstance()
