'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const Parameter = require('./Parameter');
const ReturnType = require('./ReturnType');

class Function extends CSDLElement {
  constructor(root, cache) {
    super();
    this.Annotations = {};
    this.Parameters = {};
    this.ReturnType = null;
  }

  addElement(element, cache) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, 'Term', Annotation, this.Annotations);
      case 'Parameter':
        return this.addSimpleElement(element, cache, 'Name', Parameter, this.Parameters);
      case 'ReturnType':
        return this.addDirectElement(element, cache, 'ReturnType', ReturnType);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown element name '+elemName));
        });
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
        return this.alreadyHandled();
      case 'IsBound':
      case 'IsComposable':
        return this.addBoolenAttribute(attribute, attrName);
      case 'EntitySetPath':
        return this.addSimpleAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = Function;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
