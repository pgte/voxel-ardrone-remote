var Duplex = require('stream').Duplex;

var inn = exports.in = new Duplex();
var out = exports.out = new Duplex();

out.on('data', function(d) {
  console.log('=> ', d);
});

inn.on('data', function(d) {
  console.log('<= ', d);
});

inn._write = function(chunk, encoding, cb) {
  console.log('IN', chunk);
  out.push(chunk);
  cb();
};

inn._read = function() {};

out._write = function(chunk, encoding, cb) {
  inn.push(chunk);
  cb();
};

out._read = function() {};