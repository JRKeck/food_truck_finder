var checkinObj = {}; // Holds users & location data to send in checkin POST

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
        map.setView([e.latlng.lat, e.latlng.lng], 15);

        clientLocLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'marker-color': '#E5574E',
                'marker-symbol': 'star'
            }
        });

        //Fade out the loading screen once the location is found
        $('.loading-screen').fadeOut( "fast", function() {
        });

    });
    map.on('locationerror', function() {
        console.log('Position could not be found');
    });
}

function forwardGeocode(lat,lng){
    checkinObj.addressLat = lat;
    checkinObj.addressLng = lng;
    $.ajax({
        url: "https://api.mapbox.com/v4/geocode/mapbox.places/"+lng+","+lat+".json?access_token="+mapboxToken,
        success: function(data){
            displayCheckinData(data);
        }
    });//End ajax call
}

function displayCheckinData(data){
    checkinObj.addressFull = data.features[0].place_name;
    checkinObj.streetNumber = data.features[0].address;
    checkinObj.addressShort = data.features[0].text;
    checkinObj.addressCity = data.features[1].text;

    console.log(checkinObj);


    $('.address p').html(checkinObj.addressFull);
    $('.checkin-bottom').slideDown( "slow", function() {
        // Animation complete.
    });
}

function submitCheckinData(){
    console.log(checkinObj);
    $.ajax({
        method: "POST",
        url: "/mapdata/addtrucklocation",
        data: checkinObj,
        success: function(data){
            window.location = "/";
        }
    });//End ajax call

}

function checkinMapHeight(){
    // Get height of parent div
    var mapHeight = $('.checkin-map-container').innerHeight();
    var headerHeight = $('.checkin-map-container h1').outerHeight();
    // set map Height
    mapHeight = mapHeight - headerHeight;
    $('.loading-screen').css('height', mapHeight+'px');
    $('#map').css('height', mapHeight+'px');
}

//Establish map api
L.mapbox.accessToken = mapboxToken;
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
map.setView([44.98,-93.2638], 13);

getCheckinLocation();


$(document).ready(function() {
    $('body').on('click', '.send-location', function(){
        console.log('click event');
        submitCheckinData();
    });
    checkinMapHeight();

    $( window ).resize(function() {
        checkinMapHeight();
    });


    $('#setTime').timepicker();
    console.log(new Date());
    $('#setTime').timepicker('setTime', new Date().addHours(4));
    $('#setTime').on('changeTime', function() {
        console.log($('#setTime').val());
        //$('#onselectTarget').text($(this).val());
    });
});