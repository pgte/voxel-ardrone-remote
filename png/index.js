var http = require('http');
var png = require('../video').hub.out;

var fs = require('fs');
var pngs = [
  fs.readFileSync('pnggrad16rgb.png'),
  fs.readFileSync('pnggrad16rgba.png')
];
var i = 0;

var server = module.exports = http.createServer(function(req, res) {
  console.log('new png video client');
  res.writeHead(200, { 'Content-Type': 'multipart/x-mixed-replace; boundary=--daboundary' });

  png.on('data', onData);

  function onData(d) {
    d = d.toString('utf8').slice(22);
    d = new Buffer(d, 'base64');
    res.write('--daboundary\nContent-Type: image/png\nContent-length: ' + d.length + '\n\n');
    res.write(d);
  }

  res.once('close', function(chunk, encoding, cb) {
    png.removeListener('data', onData);
  });
});