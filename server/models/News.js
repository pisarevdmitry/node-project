const DataTypes = require('sequelize')
const sequelize =  require('../services/sequelize');

const News = sequelize.define('News', {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
    })


module.exports = News;