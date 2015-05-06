var websocket = require('websocket-stream');
var MuxDemux = require('mux-demux');
var server = require('../').webserver;
var wss = websocket.createServer({server: server}, handle);
var hub = require('../hub');
var video = require('../video');

function handle(stream) {
  console.log('new websocket connection');
  var m = MuxDemux(handleStream);
  stream.pipe(m).pipe(stream);
  var commands = m.createStream('commands')
  commands.pipe(hub.out, {end: false}).pipe(commands);

  stream.once('end', function() {
    hub.out.unpipe(commands);
  });

  m.on('error', function(err) {
    console.error(err.message || err);
    m.destroy();
  });

  stream.on('error', function(err) {
    console.error(err.message || err);
    stream.destroy();
  });
}

function handleStream(stream) {
  if (stream.meta == 'video') {
    console.log('*** I have video stream ***');
    stream.pipe(video.hub.inn, {end: false});
  }
}