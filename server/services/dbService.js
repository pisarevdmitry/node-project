const sequelize = require('../services/sequelize');

class DbService {
  constructor(model) {
    this.db = sequelize;
    this.model = model;
  }
  transaction() {
    return this.db.transaction();
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
