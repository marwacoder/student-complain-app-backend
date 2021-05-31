'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasOne(models.Lecturer, {
      as: 'lecturer',
      foreignKey: 'courseId',
      }),
      Course.belongsTo(models.LecturerInbox, {
      as: 'course',
      foreignKey: 'courseId',
      })
    }

    
    

  };
  Course.init({
    courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    courseTitle: DataTypes.STRING,
    courseCode: DataTypes.STRING,
    adminId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};