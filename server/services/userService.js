const { User } = require('../models');
const permissionsService = require('./permissionsService');
const imageService = require('./imageService');
const path = require('path');
const { upload } = require('../../config');
const DbService = require('./dbService');
const passwordService = require('./passwordService');

class UserService extends DbService {
  constructor() {
    super(User);
    this.permissionsService = new permissionsService();
    this.imageService = new imageService();
    this.password = new passwordService();
  }
  async getUsers() {
    try {
      const users = await this.findAll({
        include: ['permission'],
        order: [['id', 'ASC']]
      });

      return {
        status: true,
        message: null,
        users: users.map(user => ({
          ...user.dataValues,
          permission: { ...user.dataValues.permission.dataValues }
        }))
      };
    } catch (e) {
      return {
        status: false,
        message: e
      };
    }
  }

  async updateUserPermission(data, id) {
    try {
      const permission = await this.permissionsService.updateUserPermission(
        data,
        {
          where: {
            user_id: id
          }
        }
      );

      if (!permission) {
        return {
          status: false,
          message: 'server error'
        };
      }

      return {
        status: true,
        message: null
      };
    } catch (e) {
      return {
        status: false,
        message: 'error'
      };
    }
  }

  async deleteUser(id) {
    const transaction = await this.transaction();
    try {
      const user = await this.findById(id, {transaction});
      await user.destroy({transaction});
      const image = user.dataValues.image;
      console.log('image',image)
      if(image) {
        this.imageService.deleteFile(
        path.resolve(
          process.cwd(),
          upload,
          path.basename(image))
      );
      }
      transaction.commit();
      return {
        status: true,
        message: null
      };
    } catch (e) {
      transaction.rollback()
      return {
        status: false,
        message: 'error'
      };
    }
  }

  async updateUserInfo({ id, ...data }) {
    const user = await this.findById(id, { include: ['permission'] });

    if (data.oldPassword) {
      const isValid = await this.password.comparePasswords(
        data.oldPassword,
        user.dataValues.password
      );
      if (!isValid) {
        return {
          status: false,
          message: 'старый пароль не корректен'
        };
      }
    }
    const updatedUser = await user.update(data);

    return {
      status: true,
      message: null,
      user: {
        ...updatedUser.dataValues,
        permission: { ...updatedUser.dataValues.permission.dataValues }
      }
    };
  }
  async updateUserImage({ id, ...data }) {
    try {
      const user = await this.findById(id, { include: ['permission'] });
      const imagePath =
        user && user.dataValues.image
          ? path.basename(user.dataValues.image)
          : null;
      const uploadDir = path.basename(upload);
      await this.imageService.proceesImage(data.image.path);

      const updatedUser = await user.update({
        ...data,
        image: path.join(uploadDir, data.image.filename)
      });

      if (imagePath) {
        this.imageService.deleteFile(
          path.resolve(process.cwd(), upload, imagePath)
        );
      }
      return {
        status: true,
        message: null,
        path: updatedUser.dataValues.image
      };
    } catch (e) {
      this.imageService.deleteFile(
        path.resolve(process.cwd(), upload, data.image.filename)
      );
      return {
        status: false,
        message: e
      };
    }
  }
}
module.exports = UserService;
