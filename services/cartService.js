const shoppingCartRepository = require('../repositories/shoppingCartRepository')
const cartItemRepository = require('../repositories/cartItemRepository')
const orderRepository = require('../repositories/orderRepository')
const productSnapshotRepository = require('../repositories/productSnapshotRepository')
const orderItemRepository = require('../repositories/orderItemRepository')
const transactionRepository = require('../repositories/transactionRepository')
const helper = require('../utils/helper')
const { sequelize } = require('../models')
const CartModel = require('../responseModels/cart')
const OrderTransformer = require('../models/modelTransformer/order')
const _ = require('lodash')

class PrivateCartService {
  constructor () {}

  async getCartItems (memberId) {
    const result = await shoppingCartRepository.getCartDetails(memberId)

    return new CartModel(result)
  }

  async createOrUpdateCart (memberId, products) {
    const cart = await shoppingCartRepository.createCart(
      helper.snakeCaseTransformer({ memberId })
    )

    const cartData = products.map(p => {
      p.cartId = cart.id
      return helper.snakeCaseTransformer(p)
    })

    await cartItemRepository.updateCartItems(cartData)
    return this.getCartItems(cart.id)
  }

  async cartCheckout (memberId, cardNo) {
    // get cart items
    const cartItems = await this.getCartItems(memberId)

    const { orderId, transactionId } = await sequelize.transaction(async t => {
      const orderData = helper.snakeCaseTransformer(
        new OrderTransformer(cartItems.memberId, cartItems.products)
      )
      // create order
      const order = await orderRepository.createOrder(orderData)
      // create product snapshot if not exists
      await productSnapshotRepository.createProductSnapshot(cartItems.products)
      // get latest snapshots
      const snapshots = await productSnapshotRepository.getLatestSnapshot(
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
    await orderRepository.updateOrderStatusAsPaid(orderId, transactionId)

    // clear cart & cart item
    await Promise.all([
      shoppingCartRepository.clearCart(cartItems.cartId),
      cartItemRepository.clearCartItems(cartItems.cartId)
    ])
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
