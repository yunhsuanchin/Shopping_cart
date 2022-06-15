const cartService = require('../services/cartService')

module.exports = {
  getCartItems: async (req, res, next) => {
    try {
      const { memberId } = req.params
      const result = await cartService.getCartItems(memberId)

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
      next(error)
    }
  }
}
