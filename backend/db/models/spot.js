'use strict';
const { Model, Sequelize } = require('sequelize');
const { Review } = require('./review')
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' })
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' })
      Spot.hasMany(models.Review, { foreignKey: 'spotId' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Invalid value'
          }
        }
      },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Invalid value'
          }
        }
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
