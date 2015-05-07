var websocket = require('websocket-stream');
var server = require('../').webserver;
var wss = websocket.createServer({server: server}, handle);
var hub = require('../hub');

function handle(stream) {
  console.log('new websocket connection');

  hub.out.pipe(stream).pipe(hub.out, {end: false});

  stream.on('error', function(err) {
    console.error(err.message || err);
    stream.destroy();
  });
}