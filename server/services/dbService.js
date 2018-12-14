const sequelize = require('../services/sequelize');
const DataTypes = require('sequelize');

class DbService {
  constructor(model) {
    this.db = sequelize;
    this.model = model;
    this.SERIALIZABLE = DataTypes.Transaction.ISOLATION_LEVELS.SERIALIZABLE;
    this.READ_COMMITTED = DataTypes.Transaction.ISOLATION_LEVELS.READ_COMMITTED;
    this.REPEATABLE_READ = DataTypes.Transaction.ISOLATION_LEVELS.REPEATABLE_READ;
    this.READ_UNCOMMITTED = DataTypes.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
  }
  transaction(ISOLATION_LEVEL = this.SERIALIZABLE) {
    return this.db.transaction({
      isolationLevel: ISOLATION_LEVEL
    });
  }

  getIsolationLevelSerializable(){
    return this.SERIALIZABLE
  } 

  getIsolationLevelReadCommitted(){
    return this.READ_COMMITTED
  } 

  getIsolationLevelRepeatableRead(){
    return this.REPEATABLE_READ
  } 

  getIsolationLevelReadUncommitted(){
    return this.READ_UNCOMMITTED
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
