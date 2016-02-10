console.log('scripts.js is working');

var map = L.map('map').setView([51.4, -0.09], 13); 

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (C) <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'nathanielgreen.p4569e8h',
    accessToken: 'pk.eyJ1IjoibmF0aGFuaWVsZ3JlZW4iLCJhIjoiY2lrZnlmNWE3MDAzdXVla2xoNWZ2Z2x0cSJ9.IMLpeimGtkg4X-ZEl05Vig'
}).addTo(map);


$.getJSON("dummydata.json", function(data) {

    for (i=0; i < data.tipees.length; i++) {
      L.marker([data.tipees[i].coords[0], data.tipees[i].coords[1]]).addTo(map).bindPopup(
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
          );
    }

});
