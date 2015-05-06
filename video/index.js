var Duplex = require('stream').Duplex;
var net = require('net');

var server = exports.server = net.createServer(handleConnection);
var hub = exports.hub = {
  inn: new Duplex(),
  out: new Duplex()
};


hub.inn.once('finish', function() {
  console.log('Video INN ENDED');
  console.trace();
});
hub.out.once('finish', function() {
  console.log('Video OUT ENDED');
  console.trace();
});

hub.inn._write = function(chunk, encoding, cb) {
  hub.out.push(chunk);
  cb();
};

hub.inn._read = function() {};

hub.out._write = function(chunk, encoding, cb) {
  cb();
};

hub.out._read = function() {};

hub.inn.resume();
hub.out.resume();

hub.out.on('data', function() {
  process.stdout.write('-');
});

function handleConnection(conn) {
  hub.out.pipe(conn);

  conn.once('end', function() {
    hub.out.unpipe(conn);
  });

  conn.on('error', function(err) {
    conn.destroy();
  });

}