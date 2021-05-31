'use strict';
const { types } = require('pg');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    staffId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male','Female']
    },
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};