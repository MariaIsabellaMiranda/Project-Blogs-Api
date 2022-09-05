const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const validation = require('../helpers/blogPostValidation');

const sequelize = new Sequelize(config.development);

const createNewPost = async ({ title, content, categoryIds }, userId) => {
  try {
    const data = await sequelize.transaction(async (t) => {
      const { id, updated, published } = await BlogPost.create({
        title, content, userId,
      }, { transaction: t });
      
      const categories = categoryIds.map((category) => (
        { postId: id, categoryId: category }
      ));

      await PostCategory.bulkCreate(categories, { transaction: t });

        return { id, title, content, userId, updated, published };
      });

  return data;
  } catch (e) {
    console.log(e.message);
  }
};

const createBlogPost = async (post, userId) => {
  const validPost = await validation.blogPostValidation(post);

  if (validPost) return validPost;

  const data = await createNewPost(post, userId);

  return { code: 201, data };
};

const getBlogPostsAll = async () => {
  const data = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories',
    }],
  });

  return { code: 200, data };
};

const getBlogPostId = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories',
    }],
  });

  if (!data) return { code: 404, message: 'Post does not exist' };

  return { code: 200, data };
};

const updateBlogPost = async (id, userId, { title, content }) => {
  if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
  
  const { data } = await getBlogPostId(id);
  
  if (data.user.id !== userId) return { code: 401, message: 'Unauthorized user' };
  
  await BlogPost.update({ title, content }, { where: { id } });

  const newPost = await getBlogPostId(id);

  return { code: 200, data: newPost.data };
};

const deleteBlogPost = async (id, userId) => {
  const { data } = await getBlogPostId(id);

  if (!data) return { code: 404, message: 'Post does not exist' };
  
  if (data.user.id !== userId) return { code: 401, message: 'Unauthorized user' };
  
  await BlogPost.destroy({ where: { id } });

  return { code: 204 };
};

module.exports = {
  createBlogPost,
  getBlogPostsAll,
  getBlogPostId,
  updateBlogPost,
  deleteBlogPost };