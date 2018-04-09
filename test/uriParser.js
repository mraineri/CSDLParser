var csdl = require('../index');

module.exports.parse = function(assert) {
  var metadata = csdl.parseMetadataUri('http://docs.oasis-open.org/odata/odata/v4.0/errata03/csd01/complete/vocabularies/Org.OData.Core.V1.xml', {}, function(error, metadata) {
    if(error) {
      console.log(error);
      return;
    }
    assert.equal(Object.keys(metadata).length, 2);
    var schema = metadata['Org.OData.Core.V1'];
    assert.notEqual(schema, undefined);
    schemaTest(schema, assert);

    assert.done();
  });
}
/*
module.exports.baduri = function(assert) {
  csdl.parseMetadataUri('https://raw.githubusercontent.com/pboyd04/CSDLParser/master/test/fixtures/404.xml', {}, function(error, metadata) {
    if(error) {
      assert.done();
      return;
    }
    assert.ok(false, 'Did not recieve error for invalid URI');
  });
}*/

function schemaTest(schema, assert) {
  assert.equal(Object.keys(schema).length, 23);
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
