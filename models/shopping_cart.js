'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Shopping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Shopping_cart.init(
    {
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Shopping_cart'
    }
  )
  return Shopping_cart
}
