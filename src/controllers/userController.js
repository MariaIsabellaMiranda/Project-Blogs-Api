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

module.exports = { createUser, getUserAll };