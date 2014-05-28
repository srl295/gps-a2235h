// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/**********************************************************
This gps example logs a stream of data:
coordinates, detected satellites, timestamps, and altitude.
For best results, try it while outdoors.
**********************************************************/

var tessel = require('tessel');
var gps = require('../').use(tessel.port['A']); // Replace '../' with 'gps-a2235h' in your own code

// Wait until the module is connected
gps.on('ready', function () {
  console.log('GPS module powered and ready. Waiting for satellites...');
  // Emit coordinates when we get a coordinate fix
  gps.on('coordinates', function (coords) {
    console.log('Got some coordinates!');
    console.log('  Lat:\t', coords.lat);
    console.log('  Lat:\t', coords.lon);
    console.log('  Timestamp:\t', coords.timestamp);
  });

  // Emit altitude when we get an altitude fix
  gps.on('altitude', function (alt) {
    console.log('Got an altitude of', alt.alt,
      'meters (timestamp: ' + alt.timestamp + ')');
  });

  //  All data from the module is emitted by its type parameter. Parse one!
  gps.on('satellite-list-partial', function (parsed) {
    console.log('\nDetected (at least) the following satellites:');
    //  Note that the module needs to do more than just
    //  detect a satellite in order to lock onto it
    parsed.satellites.forEach(function (sat) {
      console.log(' ', sat);
    });
  });


  // This NMEA message type contains date/time info
  // Let's call parseDate with it!
  gps.on('nav-info', parseDate);
});
