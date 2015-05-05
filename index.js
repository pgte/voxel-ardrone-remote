var app = require('./app');

var port = Number(process.env.PORT) || 3000;

var server = app.listen(port, function() {
  console.log('HTTP server listening on %j', server.address());
});