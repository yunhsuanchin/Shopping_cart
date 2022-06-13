'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Order_item.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Order, key: 'id' }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Product, key: 'id' }
      },
      product_snapshot_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Product_snapshot, key: 'id' }
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Order_item'
    }
  )
  return Order_item
}
