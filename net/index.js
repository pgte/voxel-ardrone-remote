var net = require('net');

var hub = require('../hub');

var server = module.exports = net.createServer();

server.on('connection', function(conn) {
  console.log('new TCP connection');
  conn.setEncoding('utf8');
  conn.pipe(hub.in, {end: false}).pipe(conn);

  conn.once('end', function() {
    hub.in.unpipe(conn);
  });

  conn.on('error', function(err) {
    conn.destroy();
  });
});