L.mapbox.accessToken = 'pk.eyJ1IjoianJrZWNrIiwiYSI6IjgzZTA0NmVhOGUxMjc2NjhmODYwYmQ3ZGIyZTRkOWQ1In0.XM9mizd6bF8zCqwafrGLDQ';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([44.98,-93.2638], 14);

var myLayer = L.mapbox.featureLayer().addTo(map);
//Find clients geolocation
map.locate();
// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.setView([e.latlng.lat, e.latlng.lng], 14);

    //map.fitBounds(e.bounds);
    //
    //myLayer.setGeoJSON({
    //    type: 'Feature',
    //    geometry: {
    //        type: 'Point',
    //        coordinates: [e.latlng.lng, e.latlng.lat]
    //    },
    //    properties: {
    //        'title': 'Here I am!',
    //        'marker-color': '#ff8888',
    //        'marker-symbol': 'star'
    //    }
    //});
});