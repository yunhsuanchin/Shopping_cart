const { Shopping_cart, sequelize } = require('../models')

class PrivateShoppingCartRepository {
  async createCart (cartData) {
    const [data] = await Shopping_cart.findOrCreate({
      where: { member_id: cartData.member_id }
    })

    return data
  }

  getCartDetails (memberId) {
    const sql = `
    SELECT
      sc.id AS 'cartId',
      sc.member_id AS 'memberId',
      ci.product_id AS 'product.id',
      ci.quantity AS 'product.quantity',
      p.name AS 'product.name',
      p.price AS 'product.price'
    FROM
      Shopping_carts sc
      INNER JOIN Cart_items ci ON sc.id = ci.cart_id
      INNER JOIN Products p ON ci.product_id = p.id
    WHERE
      sc.member_id = $memberId;
    `

    return sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      nest: true,
      bind: { memberId }
    })
  }

  clearCart (cartId) {
    return Shopping_cart.destroy({ where: { id: cartId } })
  }
}

class ShoppingCartRepository {
  constructor () {
    throw new Error('Use ShoppingCartRepository.getInstance()')
  }

  static getInstance () {
    if (!ShoppingCartRepository.instance) {
      ShoppingCartRepository.instance = new PrivateShoppingCartRepository()
    }

    return ShoppingCartRepository.instance
  }
}

module.exports = ShoppingCartRepository.getInstance()
