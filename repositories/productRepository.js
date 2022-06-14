const { Product } = require('../models')

class PrivateProductRepository {
  async updateBalance (products) {
    const scope = products.map(p => {
      return Product.decrement({ balance: p.quantity }, { where: { id: p.id } })
    })
    await Promise.all(scope)
  }

  getProductDetails (productIds) {
    return Product.findAll({ where: { id: productIds }, raw: true })
  }
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
