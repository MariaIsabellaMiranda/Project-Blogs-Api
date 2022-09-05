const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const loginController = require('../controllers/loginController');

router.post('/', rescue(loginController.login));

module.exports = router;