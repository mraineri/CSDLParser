'use strict';

const CSDLElement = require('./CSDLElement');
const Record = require('./Record');

class Collection extends CSDLElement {
  constructor() {
    super();
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Collection', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'PropertyPath':
        if(this.PropertyPaths === undefined) {
          this.PropertyPaths = [];
        }
        return this.addTextElement(element, cache, log, '', this.PropertyPaths);
      case 'Record':
        if(this.Records === undefined) {
          this.Records = [];
        }
        return this.addSimpleElement(element, cache, log, '', Record, this.Records);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }
}

module.exports = Collection;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
