'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExaminerInbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExaminerInbox.belongsTo(models.Student, {
      as: 'student',
      foreignKey: 'studentId',
      })
      // define association here
    }
  };
  ExaminerInbox.init({
    emailId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    complainType: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['Exam Result','Test Result']
      },
    message: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    studentId: DataTypes.STRING,
    courseId: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
       defaultValue: 'Pending',
      allowNull: false
    },
    date: DataTypes.DATEONLY
  }, {
      sequelize,
    tableName: 'ExaminerInboxs',
    modelName: 'ExaminerInbox',
  });
  return ExaminerInbox;
};