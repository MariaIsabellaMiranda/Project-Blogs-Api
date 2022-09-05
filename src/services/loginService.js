const { User } = require('../database/models');
const tokenHelper = require('../helpers/tokenHelper');

const login = async (email, password) => {
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };

  const data = await User.findOne({ where: { email, password } });

  if (!data) {
    return { code: 400, message: 'Invalid fields' };
  }

  const token = tokenHelper.createToken(email, data.id);

  return { code: 200, data: token };
};

module.exports = { login };