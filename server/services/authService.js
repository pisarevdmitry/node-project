const { User } = require('../models');
const jwtService = require('./JwtService');
const DbService = require('./dbService');
const permissionsService = require('./permissionsService');
const passwordService = require('./passwordService');

class AuthService extends DbService {
  constructor() {
    super(User);
    this.jwtService = new jwtService();
    this.permissionsService = new permissionsService();
    this.password = new passwordService()
  }

  async signUp(userData, userPermission) {
    const transaction = await this.transaction();
    try {
      const user = await this.create(userData, { transaction });
      const token = this.jwtService.genToken({ id: user.dataValues.id });
      const expiredAt = Math.floor(Date.now() + 2 * 60 * 60 * 1000);

      await user.update({ token, expiredAt }, { transaction });
      const permissions = await this.permissionsService.createUserPermission(
        { ...userPermission, user_id: user.dataValues.id },
        transaction
      );
      await transaction.commit();

      return {
        status: true,
        message: null,
        user: { ...user.dataValues, permission: { ...permissions.dataValues } }
      };
    } catch (e) {
        await transaction.rollback();
        switch (e.name) {
            case 'SequelizeUniqueConstraintError':
            return {
                status: false,
                message: 'user already exist',
                user: null
              };
            default:
            return {
                status: false,
                message: e.message,
                user: null
              };
          }
    }
  }

  async SignInLocal(login, password) {
    const transaction = await this.transaction();
    try {
      const user = await this.findOne({
        where: {
          username: login
        },
        include: ['permission'],
        transaction
      });

      if (!user || !user.dataValues.permission) {
        throw { status: false, message: 'логин не существует' };
      }

      const isValid = await this.password.comparePasswords(
        password,
        user.dataValues.password
      );

      if (!isValid) {
        throw { status: false, message: 'пароли не совпадают' };
      }
      const token = this.jwtService.genToken({ id: user.dataValues.id });
      const expiredAt = Math.floor(Date.now() + 2 * 60 * 60 * 1000);

      await user.update({ token, expiredAt }, { transaction });
      await transaction.commit();
      return {
        status: true,
        message: null,
        user: {
          ...user.dataValues,
          permission: { ...user.dataValues.permission.dataValues }
        }
      };
    } catch (e) {
      await transaction.rollback();
      if (e.message) {
        return {
          status: false,
          message: e.message
        };
      }
    }
  }

  async signInByJwt(jwt) {
    const token = this.jwtService.parseToken(jwt);
    if (!token) {
      return {
        status: false,
        message: 'невалидный токен'
      };
    }
    const user = await this.findById(token.id, { include: ['permission'] });
    
    if (!user || !user.dataValues.permission) {
      return {
        status: false,
        message: 'пользователь не существует'
      };
    }
    if(jwt !== user.dataValues.token ||Date.now() > user.dataValues.expiredA) {
      return {
        status: false,
        message: 'невалидный токен'
      };
    }
    return {
      status: true,
      message: null,
      user: {
        ...user.dataValues,
        permission: { ...user.dataValues.permission.dataValues }
      }
    };
  }
}
module.exports = AuthService;
