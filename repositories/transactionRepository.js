const { Transaction } = require('../models')

class PrivateTransactionRepository {
  createTransaction (transactionData) {
    return Transaction.create(transactionData)
  }
}

class TransactionRepository {
  constructor () {
    throw new Error('Use TransactionRepository.getInstance()')
  }

  static getInstance () {
    if (!TransactionRepository.instance) {
      TransactionRepository.instance = new PrivateTransactionRepository()
    }

    return TransactionRepository.instance
  }
}

module.exports = TransactionRepository.getInstance()
