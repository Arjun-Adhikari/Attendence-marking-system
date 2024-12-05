
const express = require('express');
const router = express.Router();
const requiredController = require('../controller/login.js');
const { Authenticate } = require('../middleware/middleware.js');
const wrapAsync = require('../utils/wrapAsync.js');

router.get('/signup', wrapAsync(requiredController.getsignup));
router.post('/signup', wrapAsync(requiredController.postsignup));

router.get('/login', wrapAsync(requiredController.getlogin));

router.post('/login', Authenticate, wrapAsync(requiredController.postlogin));

router.post('/logout', wrapAsync(requiredController.postlogout));

module.exports = router;
