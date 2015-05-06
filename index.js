// HTTP server

var app = require('./app');

var webPort = Number(process.env.WEB_PORT) || 3000;

var webserver = exports.webserver = app.listen(webPort, function() {
  console.log('HTTP server listening on %j', webserver.address());
});

require('./websocket');


// TCP command server

var server = require('./net');
var port = Number(process.env.COMMAND_PORT) || 3001;

server.listen(port, function() {
  console.log('TCP Command Server listening on %j', server.address());
});


// Video server

var video = require('./video');
var videoPort = Number(process.env.VIDEO_PORT) || 3002;

video.server.listen(videoPort, function() {
  console.log('TCP Video Server listening on %j', video.server.address());
});


// PNG Server

var pngServer = require('./png');
pngServer.listen(Number(process.env.PNG_PORT) || 3003, function() {
  console.log('PNG Video Server listening on %j', pngServer.address());
});

