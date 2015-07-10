// monkey patch mmdbreader

var fileLocation = '/tmp/GeoLite2-City.mmdb';
var zlib = Npm.require('zlib');
var https = Npm.require("https");
var fs = Npm.require('fs');

mmdbreader = Npm.require('maxmind-db-reader');


var __open = mmdbreader.open;


var newOpen = function(database,callback){
    console.log('running patched version of open');
    https.get(database, function(res) {
        var gunzip = zlib.createGunzip();            
        var file = fs.createWriteStream(fileLocation);
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            file.write(data);
        }).on("end", function() {
            file.end();
            __open.call(this, fileLocation, callback);
        }).on("error", function(e) {
            console.error('error unzipping',e);
        });
    });
};

mmdbreader.open = newOpen;