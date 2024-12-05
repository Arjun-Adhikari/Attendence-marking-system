
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

const passport = require('passport');
module.exports.Authenticate = passport.authenticate('local', {
    successRedirect: '/home/listings',
    failureRedirect: '/login',
});

