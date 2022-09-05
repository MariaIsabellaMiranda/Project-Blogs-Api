const { User } = require('../database/models');
const validation = require('../helpers/userValidation');
const tokenHelper = require('../helpers/tokenHelper');

const createUser = async (user) => {
  const validUser = validation.userValidation(user);

  if (validUser) return validUser;
  
  const verifyEmail = await validation.emailValidation(user);
  
  if (verifyEmail) return verifyEmail;

  const newUser = await User.create(user);

  const token = tokenHelper.createToken(user.email, newUser.id);

  return { code: 201, data: token };
};

const getUserAll = async () => {
  const data = await User.findAll({ attributes: { exclude: ['password'] } });

  return { code: 200, data };
};

const getUserId = async (id) => {
  const data = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!data) return { code: 404, message: 'User does not exist' };

  return { code: 200, data };
};

module.exports = { createUser, getUserAll, getUserId };