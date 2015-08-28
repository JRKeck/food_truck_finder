var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var MapMarkerSchema = new Schema({
//    username: {type: String, required: true, index: {unique: true} },
//    links: []
//});

var MapMarkerSchema = new Schema({
    "truckID" : Number,
    "type": {type: String, default: "Feature" },
    "geometry": {
        "type": {type: String, default: "Point" },
        "coordinates": []
    },
    "properties": {
        "address": String
    }
});

module.exports = mongoose.model('MapMarker', MapMarkerSchema);