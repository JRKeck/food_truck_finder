var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

// Send create account view
router.get('/create', function(req, res, next){
    var file = req.params[0] || 'assets/views/user_register.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

// Handle create account submit
router.post('/create', function(req,res,next) {
    Users.create(req.body, function (err, post) {

        if (err)
            next(err);
        else
            res.redirect('/login');
    })
});

router.get('/*', function(req, res, next){
    res.redirect('/');
});

module.exports = router;