const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Product, Shopping_cart, Cart_item } = require('../models')

const testData = require('./testData/cartTestData.json')

describe('# add products to shopping cart', () => {
  let data = Object.assign({}, JSON.parse(JSON.stringify(testData)))

  context('- product balance check', () => {
    before(async () => {
      const productInfo = await Product.findOne({
        where: { id: testData.products.map(p => p.id)[0] }
      })

      data.products[0].quantity = productInfo.balance + 1
    })

    it('- buying quantities over product limit should throw an error', done => {
      request(app)
        .post('/cart')
        .send(data)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.have.string('is not enough.')
          done()
        })
    })
  })

  context('- check cart products existence', () => {
    let data = Object.assign({}, testData)
    let cartId
    before(() => {
      const scope = data.products.map(p => {
        return Product.increment(
          { balance: p.quantity },
          { where: { id: p.id } }
        )
      })

      Promise.all(scope)
    })

    it('- shopping cart & cart item data should be created', done => {
      request(app)
        .post('/cart')
        .send(data)
        .expect(200)
        .end(async (err, res) => {
          const cart = await Shopping_cart.findOne({
            where: { member_id: data.memberId }
          })
          const cartItems = await Cart_item.findAll({
            where: { cart_id: cart.id }
          })
          cartId = cart.id
          expect(cart).to.not.be.null
          expect(cartItems.length).to.equal(data.products.length)
          done()
        })
    })

    after(() => {
      Promise.all([
        Shopping_cart.destroy({ where: { member_id: data.memberId } }),
        Cart_item.destroy({ where: { cart_id: cartId } })
      ])
    })
  })
})
