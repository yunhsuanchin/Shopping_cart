const shoppingCartRepository = require('../repositories/shoppingCartRepository')
const cartItemRepository = require('../repositories/cartItemRepository')
const CartModel = require('../responseModels/cart')
const helper = require('../utils/helper')

class PrivateCartService {
  constructor () {}

  async getCartItems (cartId) {
    const result = await shoppingCartRepository.getCartDetails(cartId)

    return new CartModel(result)
  }

  async createCart (memberId, products) {
    const cart = await shoppingCartRepository.createCart(
      helper.snakeCaseTransformer({ memberId })
    )

    const cartData = products.map(p => {
      p.cartId = cart.id
      return helper.snakeCaseTransformer(p)
    })

    await cartItemRepository.addCartItems(cartData)
    return this.getCartItems(cart.id)
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
