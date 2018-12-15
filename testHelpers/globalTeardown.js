const Db = require('../server/services/sequelize');
require('../server/models')
module.exports = async function(){
    console.error('test done')
    await Db.truncate({cascade: true})
}