const cartService = require('../services/cartService')

module.exports = {
  getCartItems: async (req, res, next) => {
    try {
      const { cartId } = req.params
      const result = await cartService.getCartItems(cartId)
      res.locals.data = result

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  createCart: async (req, res, next) => {
    try {
      const { memberId, products } = req.body
      const result = await cartService.createOrUpdateCart(memberId, products)

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  cartCheckout: async (req, res, next) => {
    try {
      const { memberId, cardNo } = req.body
      const result = await cartService.cartCheckout(memberId, cardNo)

      return res.status(200).json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
