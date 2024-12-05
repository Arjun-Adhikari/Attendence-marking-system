
const express = require('express');
const router = express.Router();
const requiredController = require('../controller/listings.js');
const { isLoggedIn } = require('../middleware/middleware.js');
const wrapAsync = require('../utils/wrapAsync.js');

router.get('/home/listings', isLoggedIn, wrapAsync(requiredController.listings));
router.get('/home/newlisting', isLoggedIn, wrapAsync(requiredController.getnewlisting));
router.post('/home/newlisting', isLoggedIn, wrapAsync(requiredController.postnewlisting));
router.put('/home/newlisting/update', isLoggedIn, wrapAsync(requiredController.newlistingupdate));
router.get('/home/alldata', isLoggedIn, wrapAsync(requiredController.getalldata));
router.delete('/delete/:id', isLoggedIn, wrapAsync(requiredController.deleteeachdata));
module.exports = router;
