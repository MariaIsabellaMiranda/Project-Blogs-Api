const categoriesService = require('../services/categoriesService');

const createCategories = async (req, res) => {
  const { name } = req.body;

  const { code, data, message } = await categoriesService.createCategories(name);

  if (!data) return res.status(code).json({ message });

  return res.status(code).json(data);
};

const getCategoriesAll = async (_req, res) => {
  const { code, data } = await categoriesService.getCategoriesAll();

  return res.status(code).json(data);
};

module.exports = { createCategories, getCategoriesAll };