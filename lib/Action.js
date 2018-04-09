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

  parse(xmlElement, cache) {
    return super.parse(xmlElement, cache, 'Action');
  }

  addElement(element, cache) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        let annotation = new Annotation();
        this.annotations[element.attr('Term').value()] = annotation;
        return annotation.parse(element, cache);
      case 'Parameter':
        let param = new Parameter();
        this.Parameters[element.attr('Name').value()] = param;
        return param.parse(element, cache);
      case 'ReturnType':
        let rt = new ReturnType();
        this.ReturnType = rt;
        return rt.parse(element, cache);
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
