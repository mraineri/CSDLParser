'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const NavigationPropertyBinding = require('./NavigationPropertyBinding');

class EntitySet extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
    this.NaviagtionPropertyBindings = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'EntitySet', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'NavigationPropertyBinding':
        return this.addSimpleElement(element, cache, log, 'Path', NavigationPropertyBinding, this.NaviagtionPropertyBindings);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'EntityType':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = EntitySet;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
