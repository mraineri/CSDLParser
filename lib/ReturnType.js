'use strict';

const CSDLElement = require('./CSDLElement');

class ReturnType extends CSDLElement {
  constructor(root, cache) {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'ReturnType', log);
  }

  addAttribute(attribute, cache, log) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'Nullable':
        return this.addBoolenAttribute(attribute, attrName);
      case 'Type':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = ReturnType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
