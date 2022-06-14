const shoppingCartRepository = require('../repositories/shoppingCartRepository')
const helper = require('../utils/helper')

class PrivateCartService {
  constructor () {}

  getCart (cartId) {}

  async createCart (memberId, products) {
    const cartData = products.map(p => {
      p.memberId = memberId
      return helper.snakeCaseTransformer(p)
    })

    const cart = await shoppingCartRepository.createCart(cartData)
    console.log({ cart })

    // const result = await shoppingCartRepository.getCartDetails(cart.id)
  }
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
