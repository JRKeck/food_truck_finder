var express = require('express');
var router = express.Router();
var path = require('path');
var mapmarkers = require('../data/mapmarkers.json');


router.get('/getmarkers', function(req, res, next){
    console.log('map marker get request made');
    res.send(mapmarkers)
});

module.exports = router;