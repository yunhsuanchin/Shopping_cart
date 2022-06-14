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
      },
      total: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM('new', 'paid', 'canceled', 'refunded'),
        defaultValue: 'new',
        allowNull: false
      },
      checksum: { type: DataTypes.STRING, allowNull: false },
      transaction_id: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
