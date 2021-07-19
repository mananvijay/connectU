const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/upload-post', postController.uploadPost);
router.get('/distroy/:id', passport.checkAuthentication ,postController.distroy);

module.exports = router;