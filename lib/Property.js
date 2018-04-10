'use strict';

const CSDLWithAnnotation = require('./CSDLWithAnnotation');
const Annotation = require('./Annotation');

class Property extends CSDLWithAnnotation {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Property', log);
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
