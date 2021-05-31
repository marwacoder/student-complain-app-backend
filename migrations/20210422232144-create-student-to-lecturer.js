'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LecturerInboxs', {
      emailId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      complainType: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['Exam Result','Test Result']
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
      type: Sequelize.ENUM,
        values: ['Pending', 'Approved', 'Rejected'],
       defaultValue: 'Pending',
    },
      studentId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Students',
          key: 'studentId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      courseId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Courses',
          key: 'courseId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      lecturerId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Lecturers',
          key: 'lecturerId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      date: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('LecturerInboxs');
  }
};