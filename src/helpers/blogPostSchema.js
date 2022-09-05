const joi = require('joi');

const userSchema = joi.object({
  title: joi.string().required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  content: joi.string().required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
  categoryIds: joi.array().required().messages({
    'string.empty': '400|Some required fields are missing',
  }),
});

module.exports = { userSchema };