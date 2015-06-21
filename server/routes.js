Router.route('/', function () {
  this.response.writeHead(302, {
    'Location': 'http://thebakeryio.github.io/geogit/'
  });

  this.response.end();

}, {where: 'server'});


Router.route('/locate/:format?', function () {
  var format = this.params.format || 'json';
  var formatToOutput = {
    'json' : function(data){
      return JSON.stringify(data);
    },

    'geogit' : function(data){
      return [
        '[Geogit] // sent from ' + 
        data.country_name, ', ', data.city,
        ' [', data.latitude + ',' + data.longitude + '] ',
        ':' + data.country_code + ':'
      ].join(''); 
    }
  };
  var req = this.request;
  var res = this.response;
  var requestIp = req.headers['x-forwarded-for'];
  var result = '';

  try {
    var geoData = FreeGeoIP.get(requestIp);  
    result = formatToOutput[format].call(this,geoData.data);
  } catch(e) {
    console.error('geoloc failed', e);
  }
  
  res.end(result);
}, {where: 'server'});