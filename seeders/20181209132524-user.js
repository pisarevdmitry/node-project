'use strict';
const userService = require('../server/services/userService');
const Service = new userService()
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const created = await Service.signUp({
      username :'admin',
      password :'123',
    },{
      chat_create: true,
      chat_read: true,
      chat_update: true,
      chat_delete: true,
      news_create: true,
      news_read: true,
      news_update: true,
      news_delete: true,
      setting_create: true,
      setting_read: true,
      setting_update: true,
      setting_delete: true,
    })
    if(!created.status) {
      throw(created.message)
    }
    return created
  },

  down: (queryInterface, Sequelize) => { 
   return Service.delete({where: {
      username: 'admin'
    }})
  }
};
