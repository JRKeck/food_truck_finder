var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//routes
var mapdata = require('./routes/mapdata');
var index = require('./routes/index');


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/mapdata', mapdata);
app.use('/', index);

app.listen(app.get('port'), function() {
    console.log('FTF is running on port', app.get('port'));
});


module.exports = app;