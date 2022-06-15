const shoppingCartRepository = require('../repositories/shoppingCartRepository')
const cartItemRepository = require('../repositories/cartItemRepository')
const orderRepository = require('../repositories/orderRepository')
const orderItemRepository = require('../repositories/orderItemRepository')
const transactionRepository = require('../repositories/transactionRepository')
const productService = require('./productService')
const helper = require('../utils/helper')
const { sequelize } = require('../models')
const CartModel = require('../responseModels/cart')
const OrderModel = require('../responseModels/order')
const OrderTransformer = require('../models/modelTransformer/order')
const _ = require('lodash')

const { NotFound, BadRequest } = require('../utils/errors')

class PrivateCartService {
  constructor () {}

  async getCartItems (memberId) {
    const result = await shoppingCartRepository.getCartDetails(memberId)

    return new CartModel(result)
  }

  async createOrUpdateCart (memberId, products) {
    // check product inventory
    await productService.checkProductBalance(products)

    const cart = await shoppingCartRepository.createCart(
      helper.snakeCaseTransformer({ memberId })
    )

    const cartData = products.map(p => {
      p.cartId = cart.id
      p.productId = p.id
      delete p.id
      return helper.snakeCaseTransformer(p)
    })

    await cartItemRepository.updateCartItems(cartData)
    return this.getCartItems(memberId)
  }

  async cartCheckout (memberId, cardNo) {
    // get cart items
    const cartItems = await this.getCartItems(memberId)
    if (!Object.keys(cartItems).length)
      throw new NotFound('There is nothing in your cart.')

    const { orderId, transactionId } = await sequelize.transaction(async t => {
      const orderData = helper.snakeCaseTransformer(
        new OrderTransformer(cartItems.memberId, cartItems.products)
      )
      // create order
      const order = await orderRepository.createOrder(orderData)
      // create product snapshot if not exists
      await productService.createSnapshots(cartItems.products)
      // get latest snapshots
      const snapshots = await productService.getLatestSnapshot(
        _.map(cartItems.products, 'id')
      )

      // order item
      const orderItemData = cartItems.products.map(p => ({
        order_id: order.id,
        product_id: p.id,
        product_snapshot_id: snapshots.find(s => s.product_id === p.id).id,
        quantity: p.quantity
      }))
      await orderItemRepository.createOrderItems(orderItemData)
      // skip payment service...
      // transaction paid
      const transactionData = {
        order_id: order.id,
        total: order.total,
        status: 'paid',
        payment_library: 'test',
        card_prefix: cardNo.substring(0, 8)
      }
      const transaction = await transactionRepository.createTransaction(
        transactionData
      )

      return { orderId: order.id, transactionId: transaction.id }
    })

    // update order status & transaction id
    // clear cart & cart item
    // update product balance
    await Promise.all([
      orderRepository.updateOrderStatusAsPaid(orderId, transactionId),
      shoppingCartRepository.clearCart(cartItems.cartId),
      cartItemRepository.clearCartItems(cartItems.cartId),
      productService.updateBalance(cartItems.products)
    ])

    return this.getOrderDetails(orderId)
  }

  async getOrderDetails (orderId) {
    const data = await orderRepository.getOrderDetails(orderId)
    return new OrderModel(data)
  }
}

class CartService {
  constructor () {
    throw new Error('Use CartService.getInstance()')
  }

  static getInstance () {
    if (!CartService.instance) {
      CartService.instance = new PrivateCartService()
    }

    return CartService.instance
  }
}

module.exports = CartService.getInstance()
