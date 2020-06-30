'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(30),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(50),
    role: DataTypes.STRING(10)
  }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.User.hasMany(models.Message);
  //     }
  //   }
  // }
  );
  return User;
};