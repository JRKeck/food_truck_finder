var mapMarkers; //Will hold map markers data

function getMarkerData() {
    $.ajax({
        url: "/mapdata/getmarkers",
        success: function(data){
            mapMarkers = data;
            //Start populating map and list
            populateMap(mapMarkers);
            return data;
        }
    });//End ajax call
}

function geolocateUser(){
    console.log("geolocating");
    if (!navigator.geolocation) {
       console.log('Geolocation is not available');
    }

    //Initiate a geolocation on the user
    map.locate();

    //Create a map layer to which a client location marker can be added
    //var clientLocLayer = L.mapbox.featureLayer().addTo(map);

    // Once we've got a position, zoom and center the map
    // on it, and add a single marker.
    map.on('locationfound', function(e) {
        console.log('location found');
        map.setView([e.latlng.lat, e.latlng.lng], 14);

        //clientLocLayer.setGeoJSON({
        //    type: 'Feature',
        //    geometry: {
        //        type: 'Point',
        //        coordinates: [e.latlng.lng, e.latlng.lat]
        //    },
        //    properties: {
        //        'title': 'Here I am!',
        //        'marker-color': '#04A195',
        //        'marker-symbol': 'rocket'
        //    }
        //});
    });
    map.on('locationerror', function() {
        console.log('Position could not be found');
    });
}

//Populate map and list with truck locations
function populateMap(markerObj){
    var listings = document.getElementById('listings');
    var locations = L.mapbox.featureLayer().addTo(map);

    locations.setGeoJSON(markerObj);

    function setActive(el) {
        var siblings = listings.getElementsByTagName('div');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className
                .replace(/active/, '').replace(/\s\s*$/, '');
        }

        el.className += ' active';
    }

    locations.eachLayer(function(locale) {

        // Shorten locale.feature.properties to prop
        var prop = locale.feature.properties;

        // For each marker on the map set pop up and list infoE
        var popup = '<h3>'+prop.truckName+'</h3><div class="info">' + prop.simpleAddress;

        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'truck';

        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'truck-link';

        link.innerHTML = "<h3>"+  prop.truckName + "</h3>";
        link.innerHTML += "<div class='address'>"+prop.simpleAddress+"</div>";
        link.innerHTML += "<div class='city'>"+prop.city+"</div>";


        // List item click behavior
        link.onclick = function() {
            setActive(listing);

            // When a menu item is clicked, animate the map to center
            // its associated locale and open its popup.
            map.setView(locale.getLatLng(), 16);
            locale.openPopup();
            return false;
        };

        // Marker interaction
        locale.on('click', function(e) {
            // Center the map on the selected marker.
            map.panTo(locale.getLatLng(), 16);

            // Set active the markers associated listing.
            setActive(listing);
        });

        popup += '</div>';
        locale.bindPopup(popup);

        locale.setIcon(L.icon({
            iconUrl: '/assets/images/map-markers/marker.png',
            iconSize: [66, 50],
            iconAnchor: [33,50],
            popupAnchor: [0, -50]
        }));

    });

    // Resize the div height once we have the list populated
    trucksNearbyHeight();
}

//Establish map api
L.mapbox.accessToken = mapboxToken;
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
map.setView([44.98,-93.2638], 14);

//Disable the scroll zoom
//map.scrollWheelZoom.disable();

geolocateUser();

//get map markers
getMarkerData();




