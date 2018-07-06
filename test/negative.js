const ParserCommon = require('../lib/ParserCommon');
const Annotation = require('../lib/Annotation');
//const XML = require('libxmljs-mt');
const XML = require('libxmljs');

const simpleWithText = '<root>Text</root>';
const invalidAnnotationElement = '<Annotation Term="Test"><BadElement></BadElement></Annotation>';
const invalidAnnotationAttribute = '<Annotation Term="Test" BadAttr="Test"></Annotation>';
const invalidAnnotationBadBool = '<Annotation Term="Test" Bool="Bad"></Annotation>';

module.exports.negative = function(assert) {
  try {
    ParserCommon.initEntity(null, 'test');
    assert.ok(false, 'Did not throw expected unbound error!');
  }
  catch(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Function not bound before call!'); 
  }

  var doc = XML.parseXml(simpleWithText);
  var root = doc.root();
  try {
    ParserCommon.parseEntity(root, 'test', null, null);
    assert.ok(false, 'Did not throw expected entity type error!');
  }
  catch(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown text element in test! Text = "Text"');
  }

  doc = XML.parseXml(invalidAnnotationElement);
  root = doc.root();
  try {
    var a = new Annotation(root);
    assert.ok(false, 'Did not throw expected invalid element error!');
  }
  catch(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown element name BadElement');
  }

  doc = XML.parseXml(invalidAnnotationAttribute);
  root = doc.root();
  try {
    var a = new Annotation(root);
    assert.ok(false, 'Did not throw expected invalid attribute error!');
  }
  catch(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown attribute name BadAttr');
  }

  doc = XML.parseXml(invalidAnnotationBadBool);
  root = doc.root();
  try {
    var a = new Annotation(root);
    assert.ok(false, 'Did not throw expected invalid attribute error!');
  }
  catch(e) {
    assert.notEqual(e, undefined);
    assert.equal(e.message, 'Unknown value Bad for attribute named Bool');
  }

  assert.done();
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
