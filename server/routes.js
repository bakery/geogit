Router.route('/locate/:format?', function () {
  var format = this.params.format || 'json';
  var formatToOutput = {
    'json' : function(data){
      return JSON.stringify(data);
    },

    'geogit' : function(data){
      return [
        'this commit comes from', 
        data.country_name, ',',
        data.city
      ].join(' '); 
    }
  };
  var req = this.request;
  var res = this.response;
  var requestIp = req.headers['x-forwarded-for'];
  var geoData = FreeGeoIP.get(requestIp);

  res.end(formatToOutput[format].call(this,geoData.data));
}, {where: 'server'});