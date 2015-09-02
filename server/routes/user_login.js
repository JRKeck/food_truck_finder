var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var redirect_to;


router.get('/', function(req, res, next){
    //Check for a redirect request in the session and store it before deleting
    redirect_to = req.session.redirect_to ? req.session.redirect_to : '/';
    delete req.session.redirect_to;
    var file = req.params[0] || 'assets/views/user_login.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        // Login success
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect(redirect_to);
        });
    })(req, res, next);
});

router.get('/*', function(req, res, next){
    res.redirect('/');
});

module.exports = router;

