const { Product_snapshot, Product } = require('../models')
const Sequelize = require('sequelize')

class PrivateProductSnapshotRepository {
  async createProductSnapshot (products) {
    const productInfo = await Product.findAll({
      where: { id: products.map(p => p.id) }
    })

    let scope = productInfo.map(p => {
      return Product_snapshot.findOrCreate({
        where: { product_id: p.id },
        defaults: {
          product_id: p.id,
          price: p.price,
          cost: p.cost
        }
      })
    })

    await Promise.all([scope.map(s => s.cost), scope])
  }

  getLatestSnapshot (productIds) {
    return Product_snapshot.findAll({
      where: { product_id: productIds },
      group: 'product_id',
      attributes: [
        [Sequelize.fn('max', Sequelize.col('id')), 'id'],
        'product_id'
      ],
      raw: true
    })
  }
}

class ProductSnapshotRepository {
  constructor () {
    throw new Error('Use ProductSnapshotRepository.getInstance()')
  }

  static getInstance () {
    if (!ProductSnapshotRepository.instance) {
      ProductSnapshotRepository.instance = new PrivateProductSnapshotRepository()
    }

    return ProductSnapshotRepository.instance
  }
}

module.exports = ProductSnapshotRepository.getInstance()
