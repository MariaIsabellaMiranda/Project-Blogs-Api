const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const tokenAuth = require('../middlewares/auth');
const blogPostController = require('../controllers/blogPostController');

router.get('/search', tokenAuth.validToken, rescue(blogPostController.getSearchBlogPost));

router.post('/', tokenAuth.validToken, rescue(blogPostController.createBlogPost));

router.get('/', tokenAuth.validToken, rescue(blogPostController.getBlogPostsAll));

router.get('/:id', tokenAuth.validToken, rescue(blogPostController.getBlogPostId));

router.put('/:id', tokenAuth.validToken, rescue(blogPostController.updateBlogPost));

router.delete('/:id', tokenAuth.validToken, rescue(blogPostController.deleteBlogPost));

module.exports = router;