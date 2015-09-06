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


    // Once we've got a position, zoom and center the map
    // on it, and add a single marker.
    map.on('locationfound', function(e) {
        console.log('location found');
        fixedMarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), {});
        map.setView([e.latlng.lat, e.latlng.lng], 14);

        // Check for map marker in case Get request hasn't returned them
        if(mapMarkers){
            populateMap(mapMarkers);
        }
    });
    map.on('locationerror', function() {
        console.log('Position could not be found');
    });
}

//Populate map and list with truck locations
function populateMap(markerObj){
    //Will hold our truck divs so we can sort them by distance before appending
    var truckList = [];

    // Target #listings on DOM
    var listings = document.getElementById('listings');
    listings.innerHTML = '';

    var locations = L.mapbox.featureLayer().addTo(map);
    // Add marker to map
    locations.setGeoJSON(markerObj);

    function setActive(el) {
        var siblings = listings.getElementsByTagName('div');
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className
                .replace(/active/, '').replace(/\s\s*$/, '');
        }

        el.className += ' active';
    }

    locations.eachLayer(function(marker) {
        // Get Lat/Lng of current location
        var currentLoc = fixedMarker.getLatLng();
        var metresToMiles = 0.000621371192;
        var distance = (metresToMiles * currentLoc.distanceTo(marker.getLatLng())).toFixed(1);

        // Shorten locale.feature.properties to prop
        var prop = marker.feature.properties;

        // For each marker on the map set pop up and list infoE
        var popup = '<h3>'+prop.truckName+'</h3><div class="info">' + prop.simpleAddress;
        popup += '</div>';
        var truck = (document.createElement('div'));
        truck.className = 'truck';
        truck.setAttribute('data-distance', distance);

        var link = truck.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'truck-link';

        link.innerHTML = "<h3>"+  prop.truckName + "</h3>";
        link.innerHTML += "<div class='address'>"+prop.simpleAddress+"</div>";
        link.innerHTML += "<div class='city'>"+prop.city+"</div></div>";
        link.innerHTML += "<div class='distance'>"+distance+" mi. away</div></div>";

        truckList.push(truck);
        // List item click behavior
        link.onclick = function() {
            setActive(truck);

            // When a menu item is clicked, animate the map to center
            // its associated locale and open its popup.
            map.setView(marker.getLatLng(), 16);
            marker.openPopup();
            return false;
        };

        // Marker interaction
        marker.on('click', function(e) {
            // Center the map on the selected marker.
            map.panTo(marker.getLatLng(), 16);

            // Set active the markers associated listing.
            setActive(truck);
        });

        // Bind Popup to marker
        marker.bindPopup(popup);

        marker.setIcon(L.icon({
            iconUrl: '/assets/images/map-markers/marker.png',
            iconSize: [66, 50],
            iconAnchor: [33,50],
            popupAnchor: [0, -50]
        }));

    });
    // Sort the trucks by distance
    truckList.sort(function(a, b) {
        return a.getAttribute('data-distance') - b.getAttribute('data-distance');
    });

    truckList.forEach(function(truck) {
        listings.appendChild(truck);
    });

    // Resize the div height once we have the list populated
    trucksNearbyHeight();
}

//Establish map api
L.mapbox.accessToken = mapboxToken;
//Call specific Map
var map = L.mapbox.map('map', 'jrkeck.7fbfb356');

//Set initial map view to Minneapolis
//map.setView([44.98,-93.2638], 14);

map.setActiveArea('map-active').setView([44.98,-93.2638], 14);

// Start with a fixed marker.
var fixedMarker = L.marker(new L.LatLng(44.95, -93.2638), {});

// Initiate a geolocation on the user
geolocateUser();

//get map markers
getMarkerData();




