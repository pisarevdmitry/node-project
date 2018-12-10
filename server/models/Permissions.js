const DataTypes = require('sequelize');
const sequelize = require('../services/sequelize');
const checkBool = require('../lib/checkBool');
const Permissions = sequelize.define('Permissions', {
  chat_create: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  chat_read: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  chat_update: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  chat_delete: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  news_create: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  news_read: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  news_update: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  news_delete: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  setting_create: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  setting_read: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  setting_update: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  setting_delete: {
    type: DataTypes.BOOLEAN,
    validate: {
      isBoolean: checkBool
    }
  },

  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'cascade'
  }
});
module.exports = Permissions;
