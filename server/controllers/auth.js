const AuthService = require('../services/authService');
const parsePermissions = require('../lib/parsePermissions');
const composePermissions = require('../lib/composePermissions');
const auth = new AuthService();

module.exports.signUp = async (req, res) => {
  const {
    username,
    password,
    firstName,
    surName,
    middleName,
    permission
  } = JSON.parse(req.body);
  const userPermission = parsePermissions(permission);
  try {
    const { user} = await auth.signUp(
      {
        username,
        firstName,
        surName,
        middleName,
        password
      },
      userPermission
    );
const createdUser = {
        ...user,
        permissionId: user.id,
        access_token: user.token,
        permission: { ...composePermissions(user.permission) }
      };
    res.json(createdUser); 
  } catch (e) {
    switch (e.name) {
      case 'SequelizeUniqueConstraintError':
        return res.status(400).json({ error: 'user already exist' });
      default:
        return res.status(400).json({ error: e });
    }
  }
};

module.exports.signIn = async (req, res) => {
  const { username, password, remembered } = JSON.parse(req.body);
  const response = await auth.SignInLocal(username, password);
  if (!response.status) {
    return res.status(401).json({ error: response.message });
  }
  const token = response.user.token
  const user = {
    ...response.user,
    permissionId: response.user.id,
    access_token: token,
    permission: { ...composePermissions(response.user.permission) }
  };

  if (remembered) {
    res.cookie('access_token', token, {
      maxAge: 60 * 60 * 1000,
      path: '/',
      httpOnly: false
    }); 
  }
  res.json(user);
}; 

module.exports.me = async (req, res) => {
  const { access_token: token } = JSON.parse(req.body);

  const response = await auth.signInByJwt(token);
  if (!response.status) {
    return res.status(401).json({ error: response.message });
  }
  const user = {
    ...response.user,
    permissionId: response.user.id,
    access_token: response.user.token,
    permission: { ...composePermissions(response.user.permission) }
  };
  res.json(user);
};
