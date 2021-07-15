const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');
router.get('/profile', userController.profile);
router.get('/posts', postsController.posts);
router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);

module.exports = router;