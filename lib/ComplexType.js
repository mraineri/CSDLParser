'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

class ComplexType extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
    this.Properties = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'ComplexType', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'Property':
        return this.addSimpleElement(element, cache, log, 'Name', Property, this.Properties);
      case 'NavigationProperty':
        return this.addSimpleElement(element, cache, log, 'Name', NavigationProperty, this.Properties);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'BaseType':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Abstract':
      case 'OpenType':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
