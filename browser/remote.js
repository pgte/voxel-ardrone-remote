var websocket = require('websocket-stream');
var inject = require('reconnect-core');
var service = require('./service');
var rpc = require('rpc-stream');

var reconnect = inject(function() {
  return websocket('ws://localhost:3000');
});




var re = reconnect({}, function(stream) {
  console.log('client connected');
  var server = rpc(service);
  server.pipe(stream).pipe(server);
  stream.on('data', function(d) {
    console.log('data: ' + d);
  });
});

re.connect();