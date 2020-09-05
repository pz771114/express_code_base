var express = require('express');
var postController = require('../controllers/postController')
var router = express.Router();

/* GET home page. */
router.route('/overview')
	.get(postController.overview)

router.route('/')
	.get(postController.newPostForm)
	.post(postController.newPost)

module.exports = router;
