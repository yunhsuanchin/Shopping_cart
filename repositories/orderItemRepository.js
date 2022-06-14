const { Order_item } = require('../models')

class PrivateOrderItemRepository {
  createOrderItems (orderItemData) {
    return Order_item.bulkCreate(orderItemData)
  }
}

class OrderItemRepository {
  constructor () {
    throw new Error('Use OrderItemRepository.getInstance()')
  }

  static getInstance () {
    if (!OrderItemRepository.instance) {
      OrderItemRepository.instance = new PrivateOrderItemRepository()
    }

    return OrderItemRepository.instance
  }
}

module.exports = OrderItemRepository.getInstance()
