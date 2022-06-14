const shoppingCartRepository = require('../repositories/shoppingCartRepository')
const cartItemRepository = require('../repositories/cartItemRepository')
const helper = require('../utils/helper')

class PrivateCartService {
  constructor () {}

  getCart (cartId) {}

  async createCart (memberId, products) {
    const cart = await shoppingCartRepository.createCart(
      helper.snakeCaseTransformer({ memberId })
    )

    console.log({ cart })
    const cartData = products.map(p => {
      p.cartId = cart.id
      return helper.snakeCaseTransformer(p)
    })

    const cartItems = await cartItemRepository.addCartItems(cartData)
    console.log({ cartItems })
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
