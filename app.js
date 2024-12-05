const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const ExpressError = require('./utils/ExpressError.js'); // Import ExpressError

const localStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const loginSchema = require('./models/login.js');
const listings = require('./routes/listings.js');
const login = require('./routes/login.js');

// Setting paths
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Forming the session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(loginSchema.authenticate()));
passport.serializeUser(loginSchema.serializeUser());
passport.deserializeUser(loginSchema.deserializeUser());

// Routes
app.use('/', listings);
app.use('/', login);

// Mongoose connection
main()
    .then(() => console.log('Starting the Mongoose server'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/attendance');
}

// Initialize some data (if necessary)
const initialize = async () => {
    const newUser = new User({
        name: 'arjun adhikari',
        rollno: 10,
        attendence: 1
    });
    await newUser.save();
};



// Error handling for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// General error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Default error" } = err;
    if (!res.headersSent) {
        res.status(statusCode).send(message);
    }
});


// Listening on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
