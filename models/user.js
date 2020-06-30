'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    role: DataTypes.STRING(10),
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(30),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};