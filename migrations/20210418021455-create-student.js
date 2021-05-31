'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      studentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
      type: Sequelize.ENUM,
      values: ['Male','Female']
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      level: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['UG-1', 'UG-2','UG-3','UG-4']
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Students');
  }
};