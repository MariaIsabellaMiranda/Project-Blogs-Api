const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { code, data, message } = await userService
  .createUser({ displayName, email, password, image });

  if (!data) return res.status(Number(code)).json({ message });

  return res.status(code).json(data);
};

const getUserAll = async (_req, res) => {
  const { code, data } = await userService.getUserAll();

  return res.status(code).json(data);
};

const getUserId = async (req, res) => {
  const { id } = req.params;

  const { code, data, message } = await userService.getUserId(id);

  if (!data) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  const { code } = await userService.deleteUser(userId);

  return res.status(code).end();
};

module.exports = { createUser, getUserAll, getUserId, deleteUser };