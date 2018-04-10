'use strict';

const CSDLElement = require('./CSDLElement');

class NavigationPropertyBinding extends CSDLElement {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'NavigationPropertyBinding', log);
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Path':
        return this.alreadyHandled();
      case 'Target':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = NavigationPropertyBinding;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
