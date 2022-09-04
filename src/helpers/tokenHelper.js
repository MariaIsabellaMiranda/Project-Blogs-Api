require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (email) => {
  const token = jwt.sign({ email }, SECRET, JWT_CONFIG);

  return { token };
};

const verifyToken = (authorization) => {
    const data = jwt.verify(authorization, SECRET);
    
    return data;
};

module.exports = { createToken, verifyToken };