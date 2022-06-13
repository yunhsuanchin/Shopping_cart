'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Transaction.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Order, key: 'id' }
      },
      total: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM('paid', 'failed', 'refunded'),
        allowNull: false
      },
      payment_library: { type: DataTypes.STRING, allowNull: false },
      card_prefix: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Transaction'
    }
  )
  return Transaction
}
