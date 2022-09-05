const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const tokenAuth = require('../middlewares/auth');
const blogPostController = require('../controllers/blogPostController');

router.post('/', tokenAuth.validToken, rescue(blogPostController.createBlogPost));
router.get('/', tokenAuth.validToken, rescue(blogPostController.getBlogPostsAll));

module.exports = router;