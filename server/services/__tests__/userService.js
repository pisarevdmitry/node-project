const UserService = require('../userService');
const AuthService = require('../authService');
const Auth = new AuthService();
const Service = new UserService();
jest.setTimeout(15000);

const createUser = (username, password, permissions) => {
  return Auth.signUp(
    {
      username,
      password
    },
    permissions
  );
};

describe('getUsers', () => {
  it('must contains users', async done => {
    await createUser('test user', '123', {
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
    });
    await createUser('test', '124', {
      chat_create: true,
      chat_read: true,
      chat_update: true,
      chat_delete: false,
      news_create: true,
      news_read: true,
      news_update: true,
      news_delete: true,
      setting_create: true,
      setting_read: true,
      setting_update: true,
      setting_delete: true
    });
    const response = await Service.getUsers();

    expect(response.users.length).toBeGreaterThanOrEqual(2);
    expect(response.status).toBeTruthy();

    done();
  });
});

describe('update permissions', async () => {
  it('if success status must be true', async () => {
    const { user } = await createUser('test user permissions', '123', {
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
    });
    const response = await Service.updateUserPermission(
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
      },
      user.id
    );

    expect(response.status).toBeTruthy();
  });

  it('status be false if user donst exist', async () => {
    const response = await Service.updateUserPermission(
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
      },
      1257989542189
    );

    expect(response).toMatchObject({
      status: false,
      message: 'user dosnt exist'
    });
  });
});

describe('delete user', () => {
  it('delete succesfull', async () => {
    const { user } = await createUser('test user delete', '123', {
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
    });
    const response = await Service.deleteUser(user.id);

    expect(response.status).toBeTruthy();
  });

  it('fail if user dosnt exist ', async () => {
    const response = await Service.deleteUser(1478965214578);

    expect(response).toMatchObject({ status: false, message: 'error' });
  });
});

describe('update user info', () => {
  it('update succesful', async () => {
    const { user } = await createUser('test user updateInfo1', '123', {
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
    });
    const response = await Service.updateUserInfo({
      id: user.id,
      username: 'test user updateInfo1_updated',
      oldPassword: '123',
      password: 'asd'
    });

    expect(response).toMatchObject({
      status: true,
      message: null,
      user: {
        username: 'test user updateInfo1_updated'
      }
    });
    expect(response.user.password).not.toBe(user.password);
  });

  it('fail if user donst exist', async () => {
    const response = await Service.updateUserInfo({
      id: 148547965,
      username: 'test user updateInfo1_updated'
    });

    expect(response).toMatchObject({
      status: false,
      message: 'пользователь не существует'
    });
  });

  it('fail if older password is incorrect', async () => {
    const { user } = await createUser('test user updateInfo2', '123', {
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
    });
    const response = await Service.updateUserInfo({
      id: user.id,
      username: 'test user updateInfo1_updated',
      oldPassword: '1234',
      password: 'asd'
    });

    expect(response).toMatchObject({
      status: false,
      message: 'старый пароль не корректен'
    });
  });
});
