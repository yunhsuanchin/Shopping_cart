const _ = require('lodash')

module.exports = class CartModel {
  constructor (data) {
    return _(data)
      .groupBy('cartId')
      .map((item, i) => ({
        cartId: item[0].cartId,
        memberId: item[0].memberId,
        products: _.uniqBy(_.map(item, 'product'), 'id')
      }))
      .head()
  }
}
