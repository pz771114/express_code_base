var express = require('express');
var userController = require('../controllers/userController')
var authController = require('../controllers/authController')
var router = express.Router();

/* GET users listing. */
router.route('/')
	.get(userController.index)

router.route('/signup')
	.get(userController.signupForm)
	.post(authController.register)

router.route('/login')
	.get(userController.loginForm)
	.post(authController.login)

router.route('/upload')
	//.get(authController.isLoggedIn,userController.getUpload)
	.get(userController.getUpload)
	.post(userController.uploadPhoto, userController.upload)
module.exports = router;
