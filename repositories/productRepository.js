const { Product } = require('../models')

class PrivateProductRepository {
  updateBalance () {}
}

class ProductRepository {
  constructor () {
    throw new Error('Use ProductRepository.getInstance()')
  }

  static getInstance () {
    if (!ProductRepository.instance) {
      ProductRepository.instance = new PrivateProductRepository()
    }

    return ProductRepository.instance
  }
}

module.exports = ProductRepository.getInstance()
