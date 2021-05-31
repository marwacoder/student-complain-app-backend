'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LecturerSent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LecturerSent.init({
    emailId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    comment: DataTypes.STRING,
    from: {
        allowNull: false,
        type: DataTypes.STRING
      },
      to: {
        allowNull: false,
        type: DataTypes.STRING
      },
    status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['Approved', 'Rejected']
      },
    studentId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    studentEmailId: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
      modelName: 'LecturerSent',
    tableName: 'LecturerSents'
  });
  return LecturerSent;
};