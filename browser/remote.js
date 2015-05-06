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

  stream.on('error', function(err) {
    console.log(err.message || err);
    stream.destroy();
  });

  var m = MuxDemux(function(stream) {
    if (stream.meta == 'commands') {
      var server = rpc(service);
      server.pipe(stream).pipe(server);
    }
  });

  m.on('error', function(err) {
    console.log(err.message || err);
    m.destroy();
  });

  stream.pipe(m).pipe(stream);

  // video

  var video = m.createWriteStream('video');
  var s = drone.createPngStream();
  s.resume();
  //s.pipe(video);

  var ended = false;
  var frame;

  function onFrame(_frame) {
    frame = _frame;
  }
  s.on('data', onFrame);

  var interval = setInterval(function() {
    if (frame) {
      // console.log(frame);
      video.write(frame);
    }
  }, 5e2);

  stream.once('finish', function() {
    console.log('websocket stream finished');
    clearInterval(interval);
    s.removeListener('data', onFrame);
  });
});

re.connect();