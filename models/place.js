'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Place.init({
    idCITIES: DataTypes.INTEGER,
    idUSERS: DataTypes.INTEGER,
    name: DataTypes.STRING(50),
    description: DataTypes.STRING(500),
    rooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    max_guests: DataTypes.INTEGER,
    price_by_night: DataTypes.INTEGER,
    available: DataTypes.STRING(30)
  }, {
    sequelize,
    modelName: 'Place',
  });
  return Place;
};