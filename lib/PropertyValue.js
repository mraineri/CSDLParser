'use strict';

const CSDLElement = require('./CSDLElement');

class PropertyValue extends CSDLElement {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'PropertyValue', log);
  } 

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Property':
        return this.alreadyHandled();
      case 'String':
      case 'Path':
      case 'EnumMember':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Bool':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = PropertyValue;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
