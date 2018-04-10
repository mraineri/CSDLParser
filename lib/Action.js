'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const Parameter = require('./Parameter');
const ReturnType = require('./ReturnType');

class Action extends CSDLElement {
  constructor(root, cache) {
    super();
    this.Annotations = {};
    this.Parameters = {};
    this.ReturnType = null;
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Action', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'Parameter':
        return this.addSimpleElement(element, cache, log, 'Name', Parameter, this.Parameters);
      case 'ReturnType':
        return this.addDirectElement(element, cache, log, 'ReturnType', ReturnType);
      default:
        throw new Error('Unknown element name '+elemName);
        break;
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'IsBound':
        return this.addBoolenAttribute(attribute, attrName);
      case 'Name':
        return this.alreadyHandled();
      default:
        throw new Error('Unknown attribute name '+attrName);
    }
  }
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
