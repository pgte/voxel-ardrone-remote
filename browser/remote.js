var websocket = require('websocket-stream');
var inject = require('reconnect-core');
var service = require('./service');
var rpc = require('rpc-stream');

var reconnect = inject(function() {
  return websocket('ws://localhost:3000');
});

var re = reconnect({}, function(stream) {
  console.log('client connected');

  stream.on('error', function(err) {
    console.log(err.message || err);
    stream.destroy();
  });

  var server = rpc(service);
  server.pipe(stream).pipe(server);

});

re.connect();