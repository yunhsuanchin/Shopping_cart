'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product_snapshot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Product_snapshot.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: { model: Product, key: 'id' }
      },
      price: { type: DataTypes.INTEGER, allowNull: false },
      cost: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Product_snapshot'
    }
  )
  return Product_snapshot
}
