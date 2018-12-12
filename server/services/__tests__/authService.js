const User = require('../../models/User');
const Permissions = require('../../models/Permissions');
const AuthService = require('../authService');
const Service = new AuthService()

/* const createUser = async() => {
    const User = await User.create(userData);
    return Permissions.create({ ...userPermission, user_id: user.dataValues.id });
} */

describe('signIn',() => {
    let  createdUser
    beforeEach(async () => {
       createdUser = await Service.signUp({
            username :'test user',
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
    })
    afterEach( async() => {
        await User.destroy({where: {},truncate: true, cascade: true})
    })
    it('create user suceesfully',() =>{
        expect(createdUser.status).toBeTruthy
    })
})