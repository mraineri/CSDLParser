var csdl = require('../index');
var bunyan = require('bunyan');

/*Redfish uses CSDL very differently, let's make sure we can also parse Redfish style CSDL*/
module.exports.redfish = function(assert) {
  csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', {}, function(error, metadata) {
    assert.ifError(error);
    if(error) {
      console.log(error);
    }
    //console.log(metadata);
    assert.done();
  });
}

module.exports.redfishNoNetwork = function(assert) {
  var options = {
    useLocal: __dirname + '/fixtures/Redfish/',
    useNetwork: false,
    logger: bunyan.createLogger({name: 'redfishNoNetwork'})};
  options.logger.level('info');
  csdl.parseMetadataFile(__dirname + '/fixtures/Redfish/Resource_v1.xml', options, function(error, metadata) {
    assert.ifError(error);
    if(error) {
      console.log(error);
    }
    //console.log(metadata);
    assert.done();
  });
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

/*
var assert = require('assert');
assert.done = function() {};
module.exports.redfishNoNetwork(assert);*/
