const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const {
  Shopping_cart,
  Cart_item,
  Order,
  Order_item,
  Transaction,
  Product_snapshot
} = require('../models')

const sampleOrderData = require('./testData/orderTestData.json')
const sampleCartData = require('./testData/cartTestData.json')

describe('# checkout shopping cart', () => {
  let orderData = Object.assign({}, sampleOrderData)
  let cartData = Object.assign({}, sampleCartData)
  let orderId

  before(async () => {
    const cart = await Shopping_cart.create({ member_id: cartData.memberId })
    const items = cartData.products.map(p => ({
      cart_id: cart.id,
      product_id: p.id,
      quantity: p.quantity
    }))
    await Cart_item.bulkCreate(items)
  })

  it('- order data should equal to test data', done => {
    request(app)
      .post('/cart/checkout')
      .send(orderData)
      .expect(200)
      .end(async (err, res) => {
        orderId = res.body.id

        const [order, orderItems, transaction, snapshots] = await Promise.all([
          Order.findByPk(orderId),
          Order_item.findAll({ where: { order_id: orderId } }),
          Transaction.findOne({ where: { order_id: orderId } }),
          Product_snapshot.findAll({
            where: { product_id: cartData.products.map(p => p.id) }
          })
        ])

        let total = 0
        cartData.products.forEach(p => {
          total +=
            snapshots.find(s => s.product_id === p.id).price *
            orderItems.find(o => o.product_id === p.id).quantity
        })

        expect(order).to.not.be.null
        expect(order.status).to.equal('paid')
        expect(order.total).to.equal(total)
        expect(order.transaction_id).to.equal(transaction.id)
        expect(orderItems.length).to.equal(cartData.products.length)
        expect(transaction.total).to.equal(total)
        expect(transaction.status).to.equal('paid')
        done()
      })
  })
})
