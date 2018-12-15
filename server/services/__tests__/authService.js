const User = require('../../models/User');
const AuthService = require('../authService');
const Service = new AuthService();

jest.setTimeout(15000);
let user
const createUser = () => {
  return Service.signUp(
    {
      username: 'test user auth',
      password: '123',
      firstName: 'Mark'
    },
    {
      chat_create: true,
      chat_read: true,
      chat_update: true,
      chat_delete: true,
      news_create: true,
      news_read: true,
      news_update: true,
      news_delete: true,
      setting_create: true,
      setting_read: true,
      setting_update: true,
      setting_delete: true
    }
  );
};
beforeAll(async done => {
  user = await createUser();
  console.error(user)
  done();
});

describe('signUp', () => {
  describe('create user suceesfully', () => {
    it('status true', () => {
      expect(user.status).toBeTruthy;
    });

    it('to match ', () => {
      console.log(user)
      const expected = {
        username: 'test user auth',
        firstName: 'Mark'
      };
      expect({
        username: user.user.username,
        firstName: user.user.firstName
      }).toEqual(expected);
    });
  });

  describe('fail if', () => {
    describe('user already exist', () => {
      let response;

      beforeEach(async done => {
        response = await createUser();
        done();
      });

      it('status false', async () => {
        expect(response.status).toBeFalsy();
      });

      it('message  is user already exist', () => {
        expect(response.message).toEqual('user already exist');
      });
    });
  });
});

describe('SignInLocal', () => {
  describe('if success', () => {
    let response;

    beforeEach(async () => {
      response = await Service.SignInLocal('test user', '123');
    });

    it('status true', () => {
      expect(response.status).toBeTruthy;
    });

    it('has userData', () => {
      const expected = {
        username: 'test user',
        firstName: 'Mark',
        permission: {
          chat_create: true,
          chat_read: true,
          chat_update: true,
          chat_delete: true,
          news_create: true,
          news_read: true,
          news_update: true,
          news_delete: true,
          setting_create: true,
          setting_read: true,
          setting_update: true,
          setting_delete: true
        }
      };

      expect(response.user).toMatchObject(expected);
    });
  });
  describe('if fail', () => {
    it('login incorrect', async () => {
      response = await Service.SignInLocal('user', '123');
      const expected = {
        status: false,
        message: 'логин не существует'
      };

      expect(response).toMatchObject(expected);
    });

    it('incorect password', async () => {
      response = await Service.SignInLocal('test user', '1234');
      const expected = {
        status: false,
        message: 'пароли не совпадают'
      };

      expect(response).toMatchObject(expected);
    });
  });
});

describe('Signin Jwt', () => {
  it('success', async done => {
    const user = await User.findOne({
      where: {
        username: 'test user'
      }
    });
    const response = await Service.signInByJwt(user.dataValues.token);
    const expected = {
      status: true,
      message: null,
      user: {
        username: 'test user',
        firstName: 'Mark',
        permission: {
          chat_create: true,
          chat_read: true,
          chat_update: true,
          chat_delete: true,
          news_create: true,
          news_read: true,
          news_update: true,
          news_delete: true,
          setting_create: true,
          setting_read: true,
          setting_update: true,
          setting_delete: true
        }
      }
    };

    expect(response).toMatchObject(expected);
    done();
  });
  it('fail', async done => {
    const response = await Service.signInByJwt('jdhdjhjsjsskjsijdfn');
    const expected = {
      status: false,
      message: 'невалидный токен'
    };
    
    expect(response).toMatchObject(expected);
    done();
  });
});
