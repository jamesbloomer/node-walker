var walker = require('./lib/walker.js');

walker.walk(process.argv[2], process.argv[3], function(e, location) {
  console.log('do stuff %s', JSON.stringify(location));
},function(e) {
  process.exit(0);
});
