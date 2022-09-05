const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const tokenAuth = require('../middlewares/auth');
const categoriesController = require('../controllers/categoriesController');

router.post('/', tokenAuth.validToken, rescue(categoriesController.createCategories));

router.get('/', tokenAuth.validToken, rescue(categoriesController.getCategoriesAll));

module.exports = router;