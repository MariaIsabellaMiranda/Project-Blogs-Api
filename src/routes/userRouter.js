const router = require('express').Router();
const tokenAuth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', tokenAuth.validToken, userController.getUserAll);
router.get('/:id', tokenAuth.validToken, userController.getUserId);

module.exports = router;