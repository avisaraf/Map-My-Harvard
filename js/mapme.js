/**
 * mapme.js
 *
 * Computer Science 50
 *
 * Google Maps API integrated directions function
 */
// default latitude
var LATITUDE = 42.3745615030193;

// default longitude
var LONGITUDE = -71.11803936751632;

// directions variables
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

// map
var map;

// user's location
var pos;

// geocode location
var geo;

// variable for geocode service
var geocoder;
var geostart;
var geoend;

/**
 * Intializes the map.
 */
function initialize() {
    
    // prepare to create directions
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    // prepare geocode service variable
    geocoder = new google.maps.Geocoder();
    
    // defaults
    var yard = new google.maps.LatLng(LATITUDE, LONGITUDE);
    var mapOptions = {
        zoom: 17
    }
    
    // prepare and draw map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    
    // geolocation compatibility and use
    if(navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

            map.setCenter(pos);
        });
    }   
    else 
    {
        // not using geolocation
        map.setCenter(yard);
    }
    
    // prepare directions panel
    directionsDisplay.setPanel(document.getElementById('direction-panel'));
    
    // AJAX for search function
    $('#locate').on("submit", function() {
        locate();
        return false;
    });  
    
    // no need to refresh page to navigate
    $(document.body).keydown(function(event) {
        return keystroke(event, true);
    });

    $(document.body).keyup(function(event) {
        return keystroke(event, false);
    });
    
    // ...or locate!
    $('#locate').keydown(function(event) {
        return keystrokeLocate(event, true);
    });

    $('#locate').keyup(function(event) {
        return keystrokeLocate(event, false);
    });
}

/**
 *  Handles keystrokes for calcRoute()
 */
function keystroke(event, state)
{
    // ensure we have event
    if (!event)
    {
        event = window.event;
    }

    // enter key
    if (event.keyCode == 13)
    {
        calcRoute();
        return false;
    }
}

/**
 *  Handles keystrokes for locate()
 */
function keystrokeLocate(event, state)
{
    // ensure we have event
    if (!event)
    {
        event = window.event;
    }

    // enter key
    if (event.keyCode == 13)
    {
        locate();
        return false;
    }
}

function locate() {

    // search for building
    var center = null;
    for (building in BUILDINGS)
    {
        if (BUILDINGS[building].name == document.getElementById('search').value)
        {
            center = new google.maps.LatLng(BUILDINGS[building].lat,
                                           BUILDINGS[building].lng);
        }
    }
    
    // if not a building, process geocode request
    if (center == null)
    {
        codeAddress(document.getElementById('search').value, function(data) {
            geo = data;
        });
        
        center = geo;
    }
    
    // set map to center    
    map.setCenter(center);
}

/**
 * Calculates and displays route.
 */
function calcRoute() {

    // check search mode
    var selectedMode = document.getElementById("mode").value;
    if (selectedMode == "" || document.getElementById('start').value == "" || document.getElementById('start').value == "")
    {
        return;
    }
    
    // if starting from current location, use geolocation, else find building
    var start = null;
    if (document.getElementById('start').value == "Current Location")
    {
        start = pos;
    }
    else
    {
        for (building in BUILDINGS)
        {
            if (BUILDINGS[building].name == document.getElementById('start').value)
            {
                start = new google.maps.LatLng(BUILDINGS[building].lat,
                                               BUILDINGS[building].lng);
            }
        }
    }
    // process geocode request if entry was not a selectable option
    if (start == null)
    {
        // callback function
        codeAddress(document.getElementById('start').value, function(data) {
            geostart = data;
        });
        start = geostart;
    }
    
    // find end coordinates
    var end = null;
    if (document.getElementById('end').value == "Current Location")
    {
        end = pos;
    }
    else
    {
        for (building in BUILDINGS)
        {
            if (BUILDINGS[building].name == document.getElementById('end').value)
            {
                end = new google.maps.LatLng(BUILDINGS[building].lat,
                                               BUILDINGS[building].lng);
            }
        }
    }
    
    // process geocode request if entry was not a selectable option
    if (end == null)
    {
        // callback function
        codeAddress(document.getElementById('end').value, function(data) {
            geoend = data;
            });
        end = geoend; 
    }
    
    // create route
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

/**
 * Handles geocoding requests.
 */
function codeAddress(address, callback) 
{
    // geocode request
    geocoder.geocode( {'address': address}, function(results, status) 
    {
        // get coordinates and save in geo
        if (status == google.maps.GeocoderStatus.OK) 
        {
            geo = results[0].geometry.location;
            callback(geo);
        }
        // error message
        else 
        {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    }); 
}



