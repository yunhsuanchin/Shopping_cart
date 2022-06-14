const productRepository = require('../repositories/productRepository')

class PrivateProductService {
  async updateBalance (products) {
    const scope = products.map(p => {
      return productRepository.decrement('balance', { by: p.quantity })
    })
    await Promise.all(scope)
  }
}

class ProductService {
  constructor () {
    throw new Error('Use ProductService.getInstance()')
  }

  static getInstance () {
    if (!ProductService.instance) {
      ProductService.instance = new PrivateProductService()
    }

    return ProductService.instance
  }
}

module.exports = ProductService.getInstance()
