const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const tokenAuth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/', rescue(userController.createUser));

router.get('/', tokenAuth.validToken, rescue(userController.getUserAll));

router.get('/:id', tokenAuth.validToken, rescue(userController.getUserId));

module.exports = router;