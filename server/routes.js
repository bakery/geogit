Router.route('/location', function () {
  var req = this.request;
  var res = this.response;
  var requestIp = req.headers['x-forwarded-for'];
  var geoData = FreeGeoIP.get(requestIp);
  res.end(JSON.stringify(geoData.data));
}, {where: 'server'});