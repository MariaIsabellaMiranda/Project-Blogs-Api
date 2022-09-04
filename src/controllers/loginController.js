const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { code, data, message } = await loginService.login(email, password);

  if (!data) return res.status(code).json({ message });

  res.status(code).json(data);
};

module.exports = { login };