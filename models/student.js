'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.ExaminerInbox, {
      as: 'mails',
      foreignKey: 'studentId',
      }),
      Student.belongsTo(models.LecturerInbox, {
      as: 'student',
      foreignKey: 'studentId',
      })
    }
    
  };
  Student.init({
    studentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male','Female']
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING
      },
    level: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['UG-1', 'UG-2','UG-3','UG-4']
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};