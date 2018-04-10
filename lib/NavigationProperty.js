'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class NavigationProperty extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'NavigationProperty', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      //TODO ReferentialConstraint handling
      //TODO OnDelete Handling
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
      case 'Type':
      case 'Partner':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Nullable':
      case 'ContainsTarget':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = NavigationProperty;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
