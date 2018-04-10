'use strict';

const CSDLWithAnnotation = require('./CSDLWithAnnotation');
const Annotation = require('./Annotation');

class TypeDefinition extends CSDLWithAnnotation {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'TypeDefinition', log);
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'UnderlyingType':
      case 'Scale':
      case 'SRID':
        return this.addSimpleAttribute(attribute, attrName);
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

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
