'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const PropertyValue = require('./PropertyValue');

class Record extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
    this.PropertyValues = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Record', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'PropertyValue':
        return this.addSimpleElement(element, cache, log, 'Property', PropertyValue, this.PropertyValues);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }
}

module.exports = Record;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
