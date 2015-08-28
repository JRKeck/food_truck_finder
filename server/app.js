var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//routes
var mapdata = require('./routes/mapdata');
var index = require('./routes/index');

var mongoose = require("mongoose");

// Mongo setup
var mongoURI = "mongodb://localhost/food_truck_finder_app";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/mapdata', mapdata);
app.use('/', index);

app.listen(app.get('port'), function() {
    console.log('FTF is running on port', app.get('port'));
});


module.exports = app;