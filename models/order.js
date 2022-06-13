'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Order.init(
    {
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Member, key: 'id' }
      },
      total: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM('paid', 'canceled', 'refunded'),
        allowNull: false
      },
      checksum: { type: DataTypes.STRING, allowNull: false },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Transaction, key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
