const productRepository = require('../repositories/productRepository')
const productSnapshotRepository = require('../repositories/productSnapshotRepository')
const { BadRequest } = require('../utils/errors')

class PrivateProductService {
  async updateBalance (products) {
    await productRepository.updateBalance(products)
  }

  getProductDetails (productIds) {
    return productRepository.getProductDetails(productIds.map(p => p.id))
  }

  async createSnapshots (products) {
    await productSnapshotRepository.createProductSnapshot(products)
  }

  getLatestSnapshot (productIds) {
    return productSnapshotRepository.getLatestSnapshot(productIds)
  }

  async checkProductBalance (products) {
    const productDetails = await this.getProductDetails(products)
    let checkFailed = []
    for (let p of products) {
      const target = productDetails.find(d => d.id === p.id)
      if (p.quantity > target.balance) {
        checkFailed.push(p.id)
      }
    }

    if (checkFailed.length)
      throw new BadRequest(`${checkFailed.join()} is not enough.`)
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
