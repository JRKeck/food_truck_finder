var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var MapMarkerSchema = new Schema({
//    username: {type: String, required: true, index: {unique: true} },
//    links: []
//});

var MapMarkerSchema = new Schema({
    "userID" : Number,
    "type": {type: String, default: "Feature" },
    "geometry": {
        "type": {type: String, default: "Point" },
        "coordinates": []
    },
    "properties": {
        "truckName": String,
        "streetNumber": String,
        "simpleAddress": String,
        "city": String,
        "fullAddress": String,
        "createTime": { type: Date, default: Date.now },
        "closeTime": Date
    }
});

module.exports = mongoose.model('MapMarker', MapMarkerSchema);