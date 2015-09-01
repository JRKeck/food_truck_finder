$(document).ready(function() {

});

//Establish map api
L.mapbox.accessToken = 'pk.eyJ1IjoianJrZWNrIiwiYSI6IjgzZTA0NmVhOGUxMjc2NjhmODYwYmQ3ZGIyZTRkOWQ1In0.XM9mizd6bF8zCqwafrGLDQ';
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
map.setView([44.98,-93.2638], 14);