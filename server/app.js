var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Route requires
var indexRoute = require('./routes/index');
var userRoute = require('./routes/user');
var loginRoute = require('./routes/user_login');
var mapdataRoute = require('./routes/mapdata');


// Authentication reuires
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');


// Mongo setup
var mongoose = require("mongoose");

var mongoURI = "mongodb://localhost/food_truck_finder_app";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

// Server setup
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport session
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new localStrategy({ passReqToCallback : true, usernameField: 'username' },
    function(req, username, password, done) {
    }
));

// Routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/mapdata', mapdataRoute);
app.use('/', indexRoute);

app.listen(app.get('port'), function() {
    console.log('FTF is running on port', app.get('port'));
});

// Passport
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField: 'username'
    },
    function(req, username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) throw err;
            if (!user)
                return done(null, false, {message: 'Incorrect username and password.'});

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, { message: 'Incorrect username and password.' });
            });
        });
    }));

module.exports = app;