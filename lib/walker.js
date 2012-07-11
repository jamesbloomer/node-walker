var util = require('util'),
    request = require('request'),
    async = require('async');

var walker = {};

walker.walk = function(start, end, dostuff, done) {
  var directionsApiUrl = util.format('http://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&sensor=false', start, end);
  console.log(directionsApiUrl);
  request(directionsApiUrl, function (error, response, body) {
    // TODO error handling
    if (!error && response.statusCode == 200) {
      var bodyObj = JSON.parse(body);
      var routes = bodyObj.routes;
      var legs = routes[0].legs;
      var steps = legs[0].steps;

      async.forEachSeries(steps, function(step, callback) {
         var points = step.polyline.points;
         var decodedPoints = walker.decodeLine(points);

         async.forEachSeries(decodedPoints, function(point, callback2) {
            dostuff({lat: point[0], lng: point[1]}, callback2);
         }, callback);
      }, done);
    }
  });
};
  
walker.decodeLine = function (encoded) {
  var len = encoded.length;
  var index = 0;
  var array = [];
  var lat = 0;
  var lng = 0;

  while (index < len) {
    var b;
    var shift = 0;
    var result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    array.push([lat * 1e-5, lng * 1e-5]);
  }

  return array;
};

module.exports = walker;
