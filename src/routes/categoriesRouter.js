const router = require('express').Router();
const tokenAuth = require('../middleware/auth');
const categoriesController = require('../controllers/categoriesController');

router.post('/', tokenAuth.validToken, categoriesController.createCategories);
router.get('/', tokenAuth.validToken, categoriesController.getCategoriesAll);

module.exports = router;