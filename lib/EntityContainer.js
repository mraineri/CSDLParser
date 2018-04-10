'use strict';

const CSDLElement = require('./CSDLElement');
const EntitySet = require('./EntitySet');
const Singleton = require('./Singleton');
const ActionImport = require('./ActionImport');
const FunctionImport = require('./FunctionImport');

class EntityContainer extends CSDLElement {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'EntityContainer', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'EntitySet':
        return this.addSimpleElement(element, cache, log, 'Name', EntitySet);
      case 'Singleton':
        return this.addSimpleElement(element, cache, log, 'Name', Singleton);
      case 'ActionImport':
        return this.addSimpleElement(element, cache, log, 'Name', ActionImport);
      case 'FunctionImport':
        return this.addSimpleElement(element, cache, log, 'Name', FunctionImport);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'Extends':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = EntityContainer;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
