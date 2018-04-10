'use strict';

const CSDLElement = require('./CSDLElement');
const Collection = require('./Collection');
const Record = require('./Record');

class Annotation extends CSDLElement {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Annotation', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Collection':
        return this.addDirectElement(element, cache, log, 'Collection', Collection);
      case 'Record':
        return this.addDirectElement(element, cache, log, 'Record', Record);
      case 'String':
        return this.addTextElement(element, cache, log, 'String');
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Term':
      case 'Qualifier':
      case 'String':
      case 'EnumMember':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Bool':
        return this.addBoolenAttribute(attribute, attrName);
      case 'Int':
        return this.addIntAttribute(attribute, attrName);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
