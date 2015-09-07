var app = require('./app');

// Server is here
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Mew is mewing at http://%s:%s', host, port);
});