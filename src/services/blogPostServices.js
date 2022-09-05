const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory, User } = require('../database/models');
const validation = require('../helpers/blogPostValidation');

const sequelize = new Sequelize(config.development);

const createNewPost = async ({ title, content, categoryIds }, userId) => {
  try {
    const data = await sequelize.transaction(async (t) => {
      const { id, updated, published } = await BlogPost.create({
        title, content, userId,
      }, { transaction: t });
      
      await Promise.all(
        categoryIds.map((category) =>
        PostCategory.create({
          postId: id, categoryId: category,
        }, { transaction: t })),
        );

        return { id, title, content, userId, updated, published };
      });

  return data;
  } catch (e) {
    console.log(e.message);
  }
};

const createBlogPost = async (post, email) => {
  const validPost = await validation.blogPostValidation(post);

  if (validPost) return validPost;

  const { id } = await User.findOne({ where: { email } });

  const data = await createNewPost(post, id);

  return { code: 201, data };
};

module.exports = { createBlogPost };