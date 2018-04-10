'use strict';

const CSDLElement = require('./CSDLElement');
const Schema = require('./Schema');

class DataServices extends CSDLElement {
  constructor(root, cache) {
    super(root, 'DataServices', cache);
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'DataServices', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Schema':
        return this.addSimpleElement(element, cache, log, 'Namespace', Schema);
      default:
        return Promise.reject(new Error('Unknown element name '+element.name()));
    }
  }

  /* eslint-disable guard-for-in */
  addToMetadata(metadata) {
    for(let propName in this) {
      metadata[propName] = this[propName];
    }
  }
  /* eslint-enable guard-for-in */
}
module.exports = DataServices;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
