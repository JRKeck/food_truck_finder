var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(req, res, next){
    var file = req.params[0] || 'assets/views/user_login.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);
router.get('/*', function(req, res, next){
    res.redirect('/');
});

module.exports = router;

