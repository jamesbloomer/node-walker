# route-walker

Walks a route and does stuff.

## Details
Calls Google Directions API for the given start and end point, decodes the polyline 
and then calls a function for each point.

## Install
  npm install route-walker
  
## Usage
  var walker = require('route-walker');

  var start = 'London,UK';
  var end = 'Birmingham,UK';
  
  walker.walk(start, end, function(location, done) {
      var lat = location.lat;
      var lng = location.lng;
      
      // Do your thing here...
      
      done();
  }, function(e) {
      // end of route...
  });