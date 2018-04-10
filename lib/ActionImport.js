'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class ActionImport extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, this.constructor.name, log);
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
      case 'Action':
      case 'EntitySet':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = ActionImport;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
