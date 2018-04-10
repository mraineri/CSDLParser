'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

class EntityType extends CSDLElement {
  constructor() {
    super();
    this.Annotations = {};
    this.Properties = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'EntityType', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'Property':
        return this.addSimpleElement(element, cache, log, 'Name', Property, this.Properties);
      case 'NavigationProperty':
        return this.addSimpleElement(element, cache, log, 'Name', NavigationProperty, this.Properties);
      case 'Key':
        this._key = element;
        return Promise.resolve(this);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Name':
      case 'BaseType':
        return this.addSimpleAttribute(attribute, attrName);
      case 'Abstract':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }

  postProcess(log) {
    if(this._key !== undefined) {
      let propNames = this._key.find('.//*[local-name()="PropertyRef"]/@Name');
      for(let i = 0; i < propNames.length; i++) {
        let name = propNames[i].value();
        this.setIsKey(name);
      }
      delete this._key;
    }
  }

  setIsKey(name) {
    if(this.Properties[name] !== undefined) {
      this.Properties[name].IsKey = true;
    }
  }
}

module.exports = EntityType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
