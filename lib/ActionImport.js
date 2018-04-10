'use strict';

const CSDLWithAnnotation = require('./CSDLWithAnnotation');
const Annotation = require('./Annotation');

class ActionImport extends CSDLWithAnnotation {
  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, this.constructor.name, log);
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
