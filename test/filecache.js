const FileCache = require('../lib/cache/fileCache');

module.exports.construct = function(assert) {
  var fc = new FileCache();
  assert.equal(fc.localDirs, null);
  assert.equal(fc.useNetwork, true);

  fc = new FileCache('test');
  assert.equal(fc.localDirs, 'test');
  assert.equal(fc.useNetwork, true);

  fc = new FileCache(['test', 'test2']);
  assert.deepEqual(fc.localDirs, ['test', 'test2']);
  assert.equal(fc.useNetwork, true);

  fc = new FileCache(['test', 'test2'], true);
  assert.deepEqual(fc.localDirs, ['test', 'test2']);
  assert.equal(fc.useNetwork, true);

  fc = new FileCache(['test', 'test2'], false);
  assert.deepEqual(fc.localDirs, ['test', 'test2']);
  assert.equal(fc.useNetwork, false);

  fc = new FileCache(null, true);
  assert.equal(fc.localDirs, null);
  assert.equal(fc.useNetwork, true);

  assert.done();
}

module.exports.hasFile = function(assert) {
  let log = {};
  log.trace = log.debug = log.info = log.warn = log.error = log.fatal = function() {};
  var fc = new FileCache([__dirname + '/fixtures/'], false);
  assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), false);
  var promise = fc.getFile('http://example.com/SimpleMetadata.xml', log);
  promise.then(function(data) {
    assert.notEqual(data, undefined);
    assert.equal(fc.hasFile('http://example.com/SimpleMetadata.xml'), true);
  }). catch(function(err) {
    assert.notEqual(err, null);
  }); 

  assert.done();
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
