const express = require('express');
const router = express.Router();
const userControllerApi = require('../../../controllers/api/v1/user_api');
router.post('/create-session', userControllerApi.createSession);

module.exports = router;