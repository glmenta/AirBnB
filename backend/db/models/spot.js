'use strict';
const { Model, Sequelize } = require('sequelize');

let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { as: 'Owner', foreignKey: 'ownerId' })
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' })
      Spot.hasMany(models.Review, { foreignKey: 'spotId' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      allowNull: false
      },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
      type: DataTypes.FLOAT,
      allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      include: [
        { association: 'Reviews',
          required: false,
          attributes: []
      },
      {
        association: 'SpotImages',
        required: false,
        where: { preview: true },
        attributes: []
      }
      ],
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            0
          ),
          "avgRating",
        ],
        [
          sequelize.fn(
            "COALESCE",
            sequelize.col("SpotImages.url"),
            sequelize.literal("'image preview unavailable'")
          ),
          "previewImage",
        ],
      ],
      group: ["Spot.id", "SpotImages.url"],
    },
    scopes: {
      // getAllSpotsQF() {
      //   return {
      //     attributes: [ 'id', 'ownerId', 'address', 'city', 'state', 'country','lat','lng','name','description','price','createdAt','updatedAt',
      //       // [ Sequelize.literal(`(SELECT ROUND(AVG(stars), 1) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'} WHERE "Reviews"."spotId" = "Spot"."id")`),'avgRating',],
      //       [ Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
      //       [ Sequelize.literal(`(SELECT url FROM ${schema ? `"${schema}"."SpotImages"` : 'SpotImages'} WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`),'previewImage'],
          //],
        //};
     // }}
      spotInfo: {
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "description",
          "price",
          "createdAt",
          "updatedAt",
        ],
        group: ["Spot.id"],
      },
    },
  });
  return Spot;
};
