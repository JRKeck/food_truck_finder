var mapMarkers;
var testMapMarkers = [
    {
        "type": "FeatureCollection",
        "features": [1,2,3,4]
    }
];

function ajaxGet(route) {
    $.ajax({
        url: "/"+ route,
        success: function(data){
            console.log(data);
            mapMarkers = data;
            //Place map markers on map markers
            map.featureLayer.setGeoJSON(mapMarkers);

        }
    });//End ajax call
}

//Establish map api
L.mapbox.accessToken = 'pk.eyJ1IjoianJrZWNrIiwiYSI6IjgzZTA0NmVhOGUxMjc2NjhmODYwYmQ3ZGIyZTRkOWQ1In0.XM9mizd6bF8zCqwafrGLDQ';
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
map.setView([44.98,-93.2638], 14);

//Disable the f'n scroll zoom
map.scrollWheelZoom.disable();

//Initiate a geolocation on the user
//map.locate();

//get map markers
ajaxGet("mapdata/getmarkers");




//Create a map layer to which a client location marker can be added
var clientLocLayer = L.mapbox.featureLayer().addTo(map);

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.setView([e.latlng.lat, e.latlng.lng], 14);

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




