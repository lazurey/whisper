var app = require('./app');

// Server is here
var p = process.env.PORT || 3000;

var server = app.listen(p, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Mew is mewing at http://%s:%s', host, port);
});