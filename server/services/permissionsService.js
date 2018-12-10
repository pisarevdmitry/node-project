const { Permissions } = require('../models');
const DbService = require('./dbService')

class PermissionsService extends DbService {
  constructor() {
    super(Permissions)
  }

  async createUserPermission(data, transaction) {
    return this.create(data, { transaction });
  }

  async updateUserPermission(data, options) {
    return this.update(data, { ...options });
  }
}
module.exports = PermissionsService;
