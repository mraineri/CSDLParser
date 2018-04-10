'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');

class CSDLWithAnnotation extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }
}

module.exports = CSDLWithAnnotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
