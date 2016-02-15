console.log('scripts.js is working');



// Geolcation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Browser doesn't support geolocation");
    }
};
function showPosition(position, callback) {
  userLat = position.coords.latitude
  userLon = position.coords.longitude
};

getLocation();
// Geolocation End



// Map Creation
var map = L.map('map').setView([51.4, -0.09], 16); 

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (C) <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'nathanielgreen.p4569e8h',
    accessToken: 'pk.eyJ1IjoibmF0aGFuaWVsZ3JlZW4iLCJhIjoiY2lrZnlmNWE3MDAzdXVla2xoNWZ2Z2x0cSJ9.IMLpeimGtkg4X-ZEl05Vig'
}).addTo(map);
// Map Creation End



// Haversine Function
function deg2rad(deg) {
  return deg * Math.PI / 180
}

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d*1000; // Distance *1000 to get metres
}
// Haversine Function End



// Marker Placement
function findTipees(chosenRadius) {
  $.getJSON("dummydata.json", function(data) {

    if (typeof(markers) != "undefined") {
      map.removeLayer(markers);
    };

    for (i=0; i < data.tipees.length; i++) {
    
      var coordsDifference = distance(userLat, userLon, data.tipees[i].coords[0], data.tipees[i].coords[1]);
      
      if (coordsDifference < chosenRadius ) {
        var markers = L.marker([data.tipees[i].coords[0], data.tipees[i].coords[1]])
        markers.addTo(map).bindPopup(
          "<div class='markerPopup'>" 
          + "<div class='markerTopContent'>"

                + "<div class='markerName'>"
                + data.tipees[i].name + " from " + data.tipees[i].occupation
                + "</div>"

            + "</div>"


            + "<div class='markerBottomContent'>"

                + "<div class='markerLeftContent'>"
                  + "<img class='markerPhoto' src='" + data.tipees[i].photo + "'>"
                + "</div>"

                + "<div class='markerRightContent'>"
                  + "<button href='#' class='markerLink'>TIP</button>"
                + "</div>"

            + "</div>"

          + "</div>"
        ); // End of Marker Placement
      
      } 
      else { 
        console.log('user is too far away, marker not placed');
      }; // End of if statement

    }; // End of for loop

  });
};
// Marker Placement



// Map Functions + jQuery
function resetView(){
  map.setView([userLat, userLon], 16); 
  var circle = L.circle([userLat, userLon], 1000, {
      color: 'blue',
      fillColor: '#46c8ff',
      fillOpacity: 0.1
  }).addTo(map);
};


$( "#findme" ).click(function() {
  resetView();
  findTipees(1000);
});

$( "#discover" ).click(function() {
  map.setView([userLat, userLon], 10); 
  findTipees(10000000000000000000000);
});
// Map Function + jQuery End
