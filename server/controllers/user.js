const UserService = require('../services/userService');
const Service = new UserService();
const composePermissions = require('../lib/composePermissions');
const parsePermissions = require('../lib/parsePermissions');


module.exports.updateUserInfo = async (req, res) => {
  try {
    const response = await Service.updateUserInfo({
      ...JSON.parse(req.body),
      id: req.params.id
    });
    if (!response.status) {
      return res.status(401).json({ error: response.message });
    }
    const user = {
      ...response.user,
      permissionId: response.user.id,
      access_token:response.user.token,
      permission: { ...composePermissions(response.user.permission) }
    };
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  if (req.files[0].fieldname !== req.params.id) {
    return res.status(401).send();
  }
  const response = await Service.updateUserImage({
    image: req.files[0],
    id: req.params.id
  });
  console.log(response)
  if (!response.status) {
    return res.status(401).json({ error: response.message });
  }
  
  res.json({ path: response.path });
};

module.exports.getUsers = async (req, res) => {
  const response = await Service.getUsers();

  if (!response.status) {
    return res.status(401).json({ error: response.message });
  }
  const users = response.users.map(item => ({
    ...item,
    permissionId: item.id,
    access_token: item.token,
    permission: { ...composePermissions(item.permission) }
  }));

  res.json(users);
};

module.exports.deleteUser = async (req, res) => {
  const response = await Service.deleteUser(req.params.id);
  if (!response.status) {
    return res.status(400).json({ error: response.message });
  }
  res.send;
};
module.exports.updateUserPermission = async (req, res) => {
  const data = JSON.parse(req.body);
  let permission = parsePermissions(data.permission);
  permission = Object.entries(permission).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const response = await Service.updateUserPermission(permission, req.params.id);
  if (!response.status) {
    return res.status(401).json({ error: response.message });
  }
  
  res.json();
};
