const helper = require('../../utils/helper')
const INIT_ORDER_STATUS = 'new'
const INIT_TRANSACTION_ID = -1
const CHECKSUM_LENGTH = 40

module.exports = class OrderTransformer {
  constructor (memberId, products) {
    this.memberId = memberId
    this.status = INIT_ORDER_STATUS
    this.transactionId = INIT_TRANSACTION_ID
    this.checksum = helper.generateRandomAlphanumeric(CHECKSUM_LENGTH)
    this.total = this.sumTotal(products)
  }

  sumTotal (products) {
    let total = 0
    products.forEach(product => (total += product.price * product.quantity))

    return total
  }
}
