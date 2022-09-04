const { Category } = require('../database/models');

const createCategories = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const { id } = await Category.create({ name });

  return { code: 201, data: { id, name } };
};

const getCategoriesAll = async () => {
  const data = await Category.findAll();

  return { code: 200, data };
};

module.exports = { createCategories, getCategoriesAll };