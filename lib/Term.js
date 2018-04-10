'use strict';

const CSDLWithAnnotation = require('./CSDLWithAnnotation');
const Annotation = require('./Annotation');

class Term extends CSDLWithAnnotation {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Term', log);
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'Type':
      case 'BaseTerm':
      case 'DefaultValue':
      case 'Scale':
      case 'SRID':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Nullable':
        return this.addBoolenAttribute(attribute, attrName);
      case 'MaxLength':
      case 'Precision':
        return this.addIntAttribute(attribute, attrName);
      case 'AppliesTo':
        return this.addAppliesTo(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }

  addAppliesTo(attribute, attrName) {
    this[attrName] = attribute.value().split(' ');
    return Promise.resolve(this);
  }
}

module.exports = Term;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
