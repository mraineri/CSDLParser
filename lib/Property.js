'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class Property extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Property', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
      case 'Type':
      case 'Scale':
      case 'SRID':
      case 'DefaultValue':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Nullable':
      case 'Unicode':
        return this.addBoolenAttribute(attribute, attrName);
      case 'MaxLength':
      case 'Precision':
        return this.addIntAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = Property;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
