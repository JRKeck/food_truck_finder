var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var MapMarker = require('../models/map-marker.js');
//Pull in the server json data
var mapmarkers = require('../data/mapmarkers.json');


//router.get('/getmarkers', function(req, res, next){
//    console.log('map marker get request made');
//    res.send(mapmarkers)
//});

router.get("/getmarkers", function(req,res,next){
    return MapMarker.find({}).exec(function(err, info){
        if(err) throw new Error(err);
        var geojson = {
            "type": "FeatureCollection",
            "features": info
        };
        res.send(geojson);
    });
});

router.get('/addlocation', function(req, res, next){
    console.log('location add attempt');
    var mapMarker = new MapMarker(
        {
            "truckID" : 200,
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-93.2638, 44.98]
            },
            "properties": {
                "truckName": "Chef Shack",
                "simpleAddress": "114 E 13th St",
                "fullAddress": "114 E 13th St, New York, 10003, New York, United States",
                "closeTime": "2012-03-08T12:17:24.000Z"
            }
        }
    );
    mapMarker.save(function(err){
        if(err) console.log('Post Error', err);
        res.send(mapMarker);
    });
});



module.exports = router;