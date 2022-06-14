const cartService = require('../services/cartService')

module.exports = {
  getCart: async (req, res, next) => {
    try {
      const { cartId } = req.params
      const result = await cartService.getCart(cartId)
      res.locals.data = result

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  createCart: async (req, res, next) => {
    try {
      const { memberId, products } = req.body
      const result = await cartService.createCart(memberId, products)

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },

  updateCart: async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  },

  cartCheckout: async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  }
}
