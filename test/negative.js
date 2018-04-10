const Annotation = require('../lib/Annotation');
const XML = require('libxmljs-mt');

const simpleWithText = '<root>Text</root>';
const invalidAnnotationElement = '<Annotation Term="Test"><BadElement></BadElement></Annotation>';
const invalidAnnotationAttribute = '<Annotation Term="Test" BadAttr="Test"></Annotation>';
const invalidAnnotationBadBool = '<Annotation Term="Test" Bool="Bad"></Annotation>';

module.exports.negative = function(assert) {
  var doc = XML.parseXml(invalidAnnotationElement);
  var root = doc.root();
  let a = new Annotation();
  let log = {trace: function(){}, fatal: function(){}};
  let promise = a.parse(root, null, log);
  promise.then(function(annot) {
    assert.ok(false, 'Did not throw expected invalid element error!');
  }).catch(function(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown element name BadElement');
  });

  doc = XML.parseXml(invalidAnnotationAttribute);
  root = doc.root();
  a = new Annotation();
  promise = a.parse(root, null, log);
  promise.then(function(annot) {
    assert.ok(false, 'Did not throw expected invalid attribute error!');
  }).catch(function(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown attribute name BadAttr');
  });

  doc = XML.parseXml(invalidAnnotationBadBool);
  root = doc.root();
  a = new Annotation();
  promise = a.parse(root, null, log);
  promise.then(function(annot) {
    assert.ok(false, 'Did not throw expected invalid attribute error!');
  }).catch(function(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown value Bad for attribute named Bool');
  });

  assert.done();
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
