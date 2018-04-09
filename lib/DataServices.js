'use strict';

const CSDLElement = require('./CSDLElement');
const Schema = require('./Schema');

class DataServices extends CSDLElement {
  constructor(root, cache) {
    super(root, 'DataServices', cache);
  }

  addElement(element, cache) {
    let elemName = element.name();
    switch(elemName) {
      case 'Schema':
        let namespace = element.attr('Namespace').value();
        this[namespace] = new Schema(element);
        break;
      default:
        throw new Error('Unknown element name '+element.name());
        break;
    }
  }

  addToMetadata(metadata) {
    for(let propName in this) {
      metadata[propName] = this[propName];
    }
  }
}
module.exports = DataServices;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
