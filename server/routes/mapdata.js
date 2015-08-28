var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var MapMarker = require('../models/map-marker.js');
//Pull in the server json data
var mapmarkers = require('../data/mapmarkers.json');


router.get('/getmarkers', function(req, res, next){
    console.log('map marker get request made');
    res.send(mapmarkers)
});

router.get('/addlocation', function(req, res, next){
    console.log('location add attempt');
    var mapMarker = new MapMarker();
    mapMarker.save(function(err){
        if(err) console.log('Post Error', err);
        res.send('location add attempt');
    });
});


//router.get('/addloction', function(req,res,next){
//    console.log('add location attempt');
//    var mapMarker = new MapMarker();
//    mapMarker.save(function(err){
//        if(err) console.log('Post Error', err);
//        res.send('Post Complete');
//    });
//});

module.exports = router;