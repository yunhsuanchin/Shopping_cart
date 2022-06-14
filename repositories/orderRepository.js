const { Order, sequelize } = require('../models')

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

  getOrderDetails (orderId) {
    const sql = `
    SELECT
      o.id,
      o.member_id AS 'memberId',
      o.total,
      o.status,
      oi.product_id AS 'product.id',
      oi.quantity AS 'product.quantity',
      p.name AS 'product.name',
      ps.price AS 'product.price'
    FROM
      Orders o
      INNER JOIN Order_items oi ON o.id = oi.order_id
      INNER JOIN Products p ON oi.product_id = p.id
      INNER JOIN Product_snapshots ps ON oi.product_snapshot_id = ps.id
    WHERE
      o.id = $orderId;
    `

    return sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      nest: true,
      bind: { orderId }
    })
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
