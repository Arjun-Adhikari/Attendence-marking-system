const loginSchema = require('../models/login.js');
const passport = require('passport');
const ExpressError = require('../utils/ExpressError'); // Import ExpressError

module.exports.getsignup = (req, res) => {
    res.render('signup.ejs');
};

module.exports.postsignup = async (req, res, next) => {
    let { username, email, password } = req.body;
    try {
        const existingUser = await loginSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already registered');
        }
        const newuser = new loginSchema({ username, email });
        const registeredUser = await loginSchema.register(newuser, password);
        console.log(registeredUser);
        res.redirect('/home/listings');
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports.getlogin = (req, res) => {
    res.render('login.ejs');
};

module.exports.postlogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home/listings',
        failureRedirect: '/login'
    })(req, res, next);
};

module.exports.postlogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        if (!res.headersSent) {
            return res.redirect('/login');
        }
    });
};
