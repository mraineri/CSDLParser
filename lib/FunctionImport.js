'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class FunctionImport extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'FunctionImport', log);
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
        return this.alreadyHandled();
      case 'EntitySet':
      case 'Function':
        return this.addSimpleAttribute(attribute, attrName);
      case 'IncludeInServiceDocument':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = FunctionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
