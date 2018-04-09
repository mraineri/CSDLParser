'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class Parameter extends CSDLElement {
  constructor(root, cache) {
    super();
    this.Annotations = {};
  }

  addElement(element, cache) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, 'Term', Annotation, this.Annotations);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown element name '+elemName));
        });
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Nullable':
      case 'Unicode':
        return this.addBoolenAttribute(attribute, attrName);
      case 'MaxLength':
      case 'Precision':
        return this.addIntAttribute(attribute, attrName);
      case 'Name':
      case 'Type':
      case 'Scale':
      case 'SRID':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = Parameter;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
