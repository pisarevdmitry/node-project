const sequelize = require('../services/sequelize');
const DataTypes = require('sequelize');

class DbService {
  constructor(model) {
    this.db = sequelize;
    this.model = model;
  }
  transaction(ISOLATION_LEVEL = 'SERIALIZABLE') {
    return this.db.transaction({
      isolationLevel: this.checkIsolationLevel(ISOLATION_LEVEL)
    });
  }
  checkIsolationLevel(type) {
    switch(type) {
      case 'READ_UNCOMMITTED': {
        return DataTypes.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
      }
      case 'REPEATABLE_READ': {
        return DataTypes.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
      }
      case 'READ_COMMITTED':
        return DataTypes.Transaction.ISOLATION_LEVELS.READ_COMMITTED
      default:
        return DataTypes.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    }
  }
  close() {
    this.db.close();
  }
  delete(options) {
    return this.model.destroy({ ...options });
  }

  create(data, options = {}) {
    return this.model.create(data, { ...options });
  }

  update(data, options = {}) {
    return this.model.update(data, { ...options });
  }

  findAll(options) {
    return this.model.findAll({ ...options });
  }

  findOne(options) {
    return this.model.findOne({ ...options });
  }

  findById(id, options = {}) {
    return this.model.findById(id, { ...options });
  }
}
module.exports = DbService;
