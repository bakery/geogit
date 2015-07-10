//var databaseUrl = 'https://dl.dropboxusercontent.com/u/9224326/geogit/GeoLite2-City.mmdb';
var databaseUrl = 'https://dl.dropboxusercontent.com/u/9224326/geogit/GeoLite2-City.mmdb.gz';

FreeGeoIP = {
    load : function(){
        mmdbreader.open(databaseUrl,function(err,countries){
            // get geodata
            countries.getGeoData('128.101.101.101',function(err,geodata){
                // log data :D
                console.log(geodata);
            });
        });
    }
};