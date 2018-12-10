'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chat_create: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      chat_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      chat_update: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      chat_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      news_create: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      news_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      news_update: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      news_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      setting_create: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      setting_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      setting_update: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      setting_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Permissions');
  }
};
