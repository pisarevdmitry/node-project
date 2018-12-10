const Sequelize = require('sequelize');
const {db} = require('../../config')

const sequelize = new Sequelize(db.database, db.login, db.password, {
  host: db.host,
  dialect: db.dialect,
  pool: db.pool,
});

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;