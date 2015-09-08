var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var MapMarker = require('../models/map-marker.js');


//Get map markers from DB
router.get("/getmarkers", function(req,res,next){
    return MapMarker.find({}).exec(function(err, info){
        if(err) throw new Error(err);
        var markerObjects = {
            "type": "FeatureCollection",
            "features": info
        };
        var geojson = [];
        geojson.push(markerObjects);
        res.send(geojson);
    });
});


//Add truck location to db
router.post('/addtrucklocation', function(req, res, next){
    console.log('location add attempt');
    console.log(req.body);
    var mapMarker = new MapMarker(
        {
            "userID" : req.user.userID,
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [req.body.addressLng, req.body.addressLat]
            },
            "properties": {
                "truckName": req.user.displayName,
                "streetNumber": req.body.streetNumber,
                "simpleAddress": req.body.addressShort,
                "city": req.body.addressCity,
                "fullAddress": req.body.addressFull,
                "closeTime": "2012-03-08T12:17:24.000Z"
            }
        }
    );
    mapMarker.save(function(err){
        if(err) console.log('Post Error', err);
        res.send("location added");
    });
});



module.exports = router;