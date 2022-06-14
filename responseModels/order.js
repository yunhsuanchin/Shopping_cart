const _ = require('lodash')

module.exports = class OrderModel {
  constructor (data) {
    return _(data)
      .groupBy('id')
      .map((item, i) => {
        const { product, ...rest } = item[0]
        const products = _.uniqBy(_.map(item, 'product'), 'id')

        return { ...rest, products }
      })
      .head()
  }
}
