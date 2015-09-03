var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(req, res, next){
    //if(!req.isAuthenticated()) {
    //    req.session.redirect_to = '/add-truck-location';
    //    res.redirect('/login');
    //    return
    //}
    var file = req.params[0] || 'assets/views/user_checkin.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

router.get('/*', function(req, res, next){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

module.exports = router;