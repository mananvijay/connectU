const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/upload-post', postController.uploadPost);

module.exports = router;