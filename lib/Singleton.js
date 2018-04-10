'use strict';

const CSDLWithAnnotation = require('./CSDLWithAnnotation');
const Annotation = require('./Annotation');

class Singleton extends CSDLWithAnnotation {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Singleton', log);
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'Type':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = Singleton;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
