'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      courseId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      courseTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      courseCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adminId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Admins',
          key: 'staffId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};