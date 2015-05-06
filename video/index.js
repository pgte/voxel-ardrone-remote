var Duplex = require('stream').Duplex;
var net = require('net');

var server = exports.server = net.createServer(handleConnection);
var hub = exports.hub = {
  inn: new Duplex(),
  out: new Duplex()
};

hub.inn._write = function(chunk, encoding, cb) {
  hub.out.push(chunk);
  cb();
};

hub.inn._read = function() {};

hub.out._write = function(chunk, encoding, cb) {
  hub.inn.push(chunk);
  cb();
};

hub.out._read = function() {};

function handleConnection(conn) {
  hub.out.pipe(conn);

  conn.on('error', function(err) {
    conn.destroy();
  });

}