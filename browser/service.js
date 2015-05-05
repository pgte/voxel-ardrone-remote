var commands = require('./commands');

var service = module.exports;

commands.forEach(function(command) {
  service[command] = function wrap() {
    var drone = window.drone;
    if (drone) {
      drone[command].apply(drone, arguments);
    }

    var cb = callback(arguments);
    cb();
  };
});

function callback(args) {
  for(var i = args.length - 1; i >= 0; i --) {
    if (typeof args[i] == 'function') {
      return args[i];
    }
  }
  return function() {};
}