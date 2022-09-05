const schema = require('./blogPostSchema');
const { Category } = require('../database/models');

const verifyCategories = async ({ categoryIds }) => {
  const data = await Promise.all(
    categoryIds.map((id) =>
    Category.findByPk(id)),
  );

  return data;
};

const blogPostValidation = async (post) => {
  const { error } = schema.userSchema.validate(post);

  if (error) {
    const [code, message] = error.message.split('|');

    return { code, message };
  }
  const validCategories = await verifyCategories(post);
  
  if (validCategories.includes(null)) return { code: 400, message: '"categoryIds" not found' };

  return false;
};

module.exports = { blogPostValidation };