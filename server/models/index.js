const User = require('./User');
const Permissions = require('./Permissions');
const News = require('./News');

User.hasOne(Permissions, { foreignKey: 'user_id' ,as: 'permission' })

News.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

module.exports = {
    User,
    Permissions,
    News
}