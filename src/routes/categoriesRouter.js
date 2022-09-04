const router = require('express').Router();
const tokenAuth = require('../middleware/auth');
const categoriesController = require('../controllers/categoriesController');

router.post('/', tokenAuth.validToken, categoriesController.createCategories);

module.exports = router;