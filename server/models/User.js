const DataTypes = require('sequelize')
const sequelize =  require('../services/sequelize');
const paswordService = require('../services/passwordService');
const Service = new paswordService()

const User = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      surName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password:{
        type: DataTypes.STRING,
        validate: { notEmpty: true }
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      token:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiredAt:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    })

User.beforeCreate(async user => {
    console.log('beforeCreate',user.password)
     const hash  = await Service.genHash(user.password);
     user.password = hash
});
User.beforeUpdate(async (user, options) => {
  if(user.password !== user._previousDataValues.password){
    const hash  = await Service.genHash(user.password);
    user.password = hash
  }
})
module.exports = User;