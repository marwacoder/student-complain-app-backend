'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecturer.belongsTo(models.Course, {
      as: 'course',
      foreignKey: 'courseId',
      })
    
    }
  };
  Lecturer.init({
    lecturerId: {
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
    role: DataTypes.STRING,
    courseId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Courses',
          key: 'courseId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    
  }, {
    sequelize,
    modelName: 'Lecturer',
  });
  return Lecturer;
};