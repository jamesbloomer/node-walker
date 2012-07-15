var walker = require('../lib/walker.js');

walker.walk(process.argv[2], process.argv[3], function(location, done) {
    console.log('do stuff %s', JSON.stringify(location));
    done();
}, function(e) {
    if(e) {
        console.log(e);
    }

    process.exit(0);
});
