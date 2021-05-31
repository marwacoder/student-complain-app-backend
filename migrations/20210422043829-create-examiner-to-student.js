'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExaminerSents', {
      emailId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['Approved', 'Rejected']
      },
      studentId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'studentId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      studentEmailId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'ExaminerInboxs',
          key: 'emailId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('ExaminerSents');
    
  }
};