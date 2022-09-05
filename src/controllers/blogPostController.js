const blogPostServices = require('../services/blogPostServices');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req.user;

  const { code, data, message } = await blogPostServices
  .createBlogPost({ title, content, categoryIds }, userId);

  if (!data) return res.status(Number(code)).json({ message });

  res.status(code).json(data);
};

const getBlogPostsAll = async (_req, res) => {
  const { code, data } = await blogPostServices.getBlogPostsAll();

  res.status(code).json(data);
};

const getBlogPostId = async (req, res) => {
  const { id } = req.params;

  const { code, data, message } = await blogPostServices.getBlogPostId(id);

  if (!data) return res.status(code).json({ message });

  res.status(code).json(data);
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const { code, data, message } = await blogPostServices.updateBlogPost(id, userId, req.body);

  if (!data) return res.status(code).json({ message });

  res.status(code).json(data);
};

module.exports = { createBlogPost, getBlogPostsAll, getBlogPostId, updateBlogPost };