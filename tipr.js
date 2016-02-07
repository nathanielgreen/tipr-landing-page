if (Meteor.isClient) {

  Meteor.startup(function() {
        GoogleMaps.load();
  });
  
  // Routing
  Router.route('/', function () {
    this.render('home');
  });

  Router.route('/map', function () {
    this.render('map');
  });
  
  Router.route('/signup', function () {
    this.render('signup');
  });

  // Template Helpers
  Template.map.helpers({
    exampleMapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
