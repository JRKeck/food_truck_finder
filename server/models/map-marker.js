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
        "truckName": String,
        "simpleAddress": String,
        "fullAddress": String,
        "createTime": { type: Date, default: Date.now },
        "closeTime": Date
    }
});

module.exports = mongoose.model('MapMarker', MapMarkerSchema);