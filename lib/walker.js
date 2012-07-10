var util = require('util'),
    request = require('request');

var walker = {};

walker.walk = function(start, end, dostuff, done) {
  var directionsApiUrl = util.format('http://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&sensor=false', start, end);
  console.log(directionsApiUrl);
  request(directionsApiUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var bodyObj = JSON.parse(body);
      var routes = bodyObj.routes;
      var legs = routes[0].legs;
      var steps = legs[0].steps;
      
      for (var i = 0; i < steps.length; i++) {
        // console.log('step %d', i);
        walker.amble(steps[i].start_location, steps[i].end_location, 10, dostuff);
      }

      done();
    }
  });
};

walker.amble = function(start, end, numberOfSteps, dostuff) {
//  console.log('start %s %s', start.lng, start.lat);
//  console.log('end %s %s', end.lng, end.lat);

  var lngDiff = end.lng - start.lng;
  var latDiff = end.lat - start.lat;
//  console.log('lngDiff %s', lngDiff);
//  console.log('latDiff %s', latDiff);

  var lngAdd = lngDiff / numberOfSteps;
  var latAdd = latDiff / numberOfSteps;

  var lngCurrent = start.lng;
  var latCurrent = start.lat;
//  console.log('lngCurrent %s', lngCurrent);
//  console.log('latCurrent %s', latCurrent);

  for (var i = 0; i <= numberOfSteps; i++) {
    dostuff(null, { lat : latCurrent, lng : lngCurrent});
    latCurrent = latCurrent + latAdd;
    lngCurrent = lngCurrent + lngAdd;
  }
};

module.exports = walker;
