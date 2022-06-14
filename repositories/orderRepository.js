const { Order } = require('../models')

class PrivateOrderRepository {
  createOrder (orderData) {
    return Order.create(orderData)
  }

  updateOrderStatusAsPaid (orderId, transactionId) {
    return Order.update(
      { transaction_id: transactionId },
      { where: { id: orderId } }
    )
  }
}

class OrderRepository {
  constructor () {
    throw new Error('Use OrderRepository.getInstance()')
  }

  static getInstance () {
    if (!OrderRepository.instance) {
      OrderRepository.instance = new PrivateOrderRepository()
    }

    return OrderRepository.instance
  }
}

module.exports = OrderRepository.getInstance()
