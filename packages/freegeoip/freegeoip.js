// Write your package code here!

FreeGeoIP = {
    get : function(urlOrIP, callback){
        var url = [
            'https://bakery-freegeoip.herokuapp.com/json',
            urlOrIP
        ].join('/');
        return HTTP.get(url, callback);
    }
};