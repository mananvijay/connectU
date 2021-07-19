const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comments_controlller');

router.post('/create', passport.checkAuthentication, commentController.create);
router.get('/destroy/:id', passport.checkAuthentication ,commentController.destory);

module.exports = router;