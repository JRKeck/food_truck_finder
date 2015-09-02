
function getCheckinLocation(){
    console.log("geolocating");
    if (!navigator.geolocation) {
        console.log('Geolocation is not available');
    }

    //Initiate a geolocation on the user
    map.locate();

    //Create a map layer to which a client location marker can be added
    var clientLocLayer = L.mapbox.featureLayer().addTo(map);

    // Once we've got a position, zoom and center the map
    // on it, and add a single marker.
    map.on('locationfound', function(e) {
        forwardGeocode(e.latlng.lat, e.latlng.lng);
        console.log('location found');
        map.setView([e.latlng.lat, e.latlng.lng], 16);

        clientLocLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Here I am!',
                'marker-color': '#04A195',
                'marker-symbol': 'rocket'
            }
        });
    });
    map.on('locationerror', function() {
        console.log('Position could not be found');
    });
}

function forwardGeocode(lat,lng){
    $.ajax({
        url: "https://api.mapbox.com/v4/geocode/mapbox.places/"+lng+","+lat+".json?access_token="+mapboxToken,
        success: function(data){
            displayCheckinData(data);
        }
    });//End ajax call
}

function displayCheckinData(data){


    var addressFull = data.features[0].place_name;
    var addressNumber = data.features[0].address;
    var addressShort = data.features[0].text;
    var addressCity = data.features[1].text;
    console.log(data.features[0].geometry.coordinates[0]);
    console.log(data.features[0].geometry.coordinates[1]);

    $('.checkin-info .address').append(addressNumber +" "+ addressShort);
}

//Establish map api
L.mapbox.accessToken = mapboxToken;
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
map.setView([44.98,-93.2638], 13);

getCheckinLocation();
$(document).ready(function() {

});