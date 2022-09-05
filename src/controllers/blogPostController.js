const blogPostServices = require('../services/blogPostServices');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;

  const { code, data, message } = await blogPostServices
  .createBlogPost({ title, content, categoryIds }, email);

  if (!data) return res.status(Number(code)).json({ message });

  res.status(code).json(data);
};

const getBlogPostsAll = async (req, res) => {
  const { code, data } = await blogPostServices.getBlogPostsAll();

  res.status(code).json(data);
};

module.exports = { createBlogPost, getBlogPostsAll };