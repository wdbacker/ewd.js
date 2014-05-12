var spawn = require('child_process').spawn;
var fs = require('fs');

var home = process.env.HOME;
var gtmdir = home + '/.fis-gtm';
var gtmver = fs.readdirSync(gtmdir)[0];
var gtmroot = gtmdir + '/' + gtmver;
var gtmdist = '/usr/lib/fis-gtm/' + gtmver;

if (!fs.existsSync('/usr/local/lib/libgtmshr.so')) {
  var ok = spawn('sudo', ['ln', '-s', gtmdist + '/libgtmshr.so', '/usr/local/lib/libgtmshr.so']);
  ok = spawn('sudo', ['ldconfig']);
};

process.env['GTM_REPLICATION'] = 'off';
process.env['gtmdir'] = gtmdir;
process.env['gtmver'] = gtmver;
process.env['gtm_dist'] = gtmdist;
process.env['GTMCI'] = process.cwd() + '/node_modules/nodem/resources/calltab.ci';
process.env['gtmgbldir'] = gtmroot + '/g/gtm.gld';
process.env['gtmroutines'] = gtmroot + '/o(' + gtmroot + '/r ' + gtmdir + '/r) ' + gtmdist + '/libgtmutil.so ' + gtmdist + ' ' + process.cwd() + '/node_modules/nodem/src';
