// HTTP server

var app = require('./app');

var webPort = Number(process.env.WEB_PORT) || 3000;

var webserver = exports.webserver = app.listen(webPort, function() {
  console.log('HTTP server listening on %j', webserver.address());
});

require('./websocket');


// TCP server

var server = require('./net');
var port = Number(process.env.WEB_PORT) || 3001;

server.listen(port, function() {
  console.log('TCP Server listening on %j', server.address());
});