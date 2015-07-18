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
        data.country.name, ', ', data.city.name,
        ' [', data.location.latitude + ',' + data.location.longitude + '] ',
        ':' + data.country.code + ':'
      ].join(''); 
    }
  };
  var req = this.request;
  var res = this.response;
  var requestIp = req.headers['x-forwarded-for'];
  var result = '';

  try {
    var geoData = IPGeocoder.geocode(requestIp);  
    result = formatToOutput[format].call(this,geoData);
  } catch(e) {
    console.error('geoloc failed', e);
  }
  
  res.end(result);
}, {where: 'server'});