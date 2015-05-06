var Duplex = require('stream').Duplex;

var inn = exports.in = new Duplex({encoding: 'utf8', decodeStrings: false});
var out = exports.out = new Duplex({encoding: 'utf8', decodeStrings: false});

inn.once('finish', function() {
  console.log('INN ENDED');
  console.trace();
});
out.once('finish', function() {
  console.log('OUT ENDED');
  console.trace();
});

inn._write = function(chunk, encoding, cb) {
  console.log('IN', chunk.toString());
  out.push(chunk);
  cb();
};

inn._read = function() {};

out._write = function(chunk, encoding, cb) {
  inn.push(chunk);
  cb();
};

out._read = function() {};

inn.resume();
out.resume();