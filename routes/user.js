const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');
router.get('/profile', passport.checkAuthentication ,userController.profile);
router.get('/posts', postsController.posts);
router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}, 
), userController.createSession);

router.get('/sign-out', userController.sessionDistroy);


module.exports = router;