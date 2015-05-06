var websocket = require('websocket-stream');
var MuxDemux = require('mux-demux');
var server = require('../').webserver;
var wss = websocket.createServer({server: server}, handle);
var hub = require('../hub');

function handle(stream) {
  console.log('new websocket connection');
  var m = MuxDemux();
  stream.pipe(m).pipe(stream);
  var commands = m.createStream('commands')
  commands.pipe(hub.out, {end: false}).pipe(commands);
}