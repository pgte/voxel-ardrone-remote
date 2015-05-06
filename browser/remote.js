var websocket = require('websocket-stream');
var inject = require('reconnect-core');
var MuxDemux = require('mux-demux');
var service = require('./service');
var rpc = require('rpc-stream');

var reconnect = inject(function() {
  return websocket('ws://localhost:3000');
});


var re = reconnect({}, function(stream) {
  console.log('client connected');
  var m = MuxDemux(function(stream) {
    if (stream.meta == 'commands') {
      var server = rpc(service);
      server.pipe(stream).pipe(server);
    }
  });

  stream.pipe(m).pipe(stream);

  // video

  var video = m.createWriteStream('video');
  drone.createPngStream().pipe(video);

  stream.on('error', function(err) {
    console.log(err.message || err);
    stream.destroy();
  });

  m.on('error', function(err) {
    console.log(err.message || err);
    m.destroy();
  });
});

re.connect();