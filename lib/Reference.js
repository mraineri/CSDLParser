'use strict';

const CSDLElement = require('./CSDLElement');

class Reference extends CSDLElement {
  constructor() {
    super();
    this.Uri = null;
    this.Includes = {};
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Reference', log);
  }

  addAttribute(attribute, cache, log) {
    let me = this;
    let attrName = attribute.name();
    switch(attrName) {
      case 'Uri':
        return this.processUri(attribute, cache, log);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'Include':
        return this.addInclude(element, cache, log);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addInclude(element, cache, log) {
    let namespace = element.attr('Namespace').value();
    let aliasAttr = element.attr('Alias');
    if(aliasAttr === null) {
      this.Includes[namespace] = namespace;
    }
    else {
      this.Includes[aliasAttr.value()] = namespace;
    }
    return Promise.resolve(this);
  }

  processUri(attribute, cache, log) {
    this.Uri = attribute.value();
    let me = this;
    if(cache.hasMetadata(this.Uri)) {
      return new Promise(function(resolve, reject) {
        resolve(me);
      });
    }
    else {
      let promise = cache.getMetadata(this.Uri, log);
      return new Promise(function(resolve, reject) {
        promise.then(function(data) {
          me.Metadata = data;
          resolve(me);
        }).catch(reject);
      });
    }
  }
}

module.exports = Reference;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
