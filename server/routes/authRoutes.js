const express = require('express');
const router = express();

const userAuth = require("../controllers/userController/userController");



 // Route to sign in
 router.post('/signup', userAuth.userSignup);


 //Route to login in
 router.post('/login', userAuth.userLogin);

 module.exports = router;