'use strict';

const CSDLElement = require('./CSDLElement');
const Annotation = require('./Annotation');
const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

class EnumType extends CSDLElement {
  constructor() {
    super();
    this.Members = {};
    this.Annotations = {};
    this._index = 0;
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'EnumType', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'Member':
        return this.addMember(element, cache, log);
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
        return this.alreadyHandled();
      case 'IsFlags':
        return this.addBoolenAttribute(attribute, attrName);
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }

  addMember(element, cache, log) {
    let name = element.attr('Name').value();
    let value = element.attr('Value');
    this.Members[name] = {};
    if(value === null) {
      this.Members[name].value = this._index++;
    }
    else {
      this.Members[name].value = value.value()*1;
      this._index = value.value()*1;
      this._index++;
    }
    let children = element.childNodes();
    if(children.length === 0) {
      return Promise.resolve(this);
    }
    else {
      let promises = [];
      for(let i = 0; i < children.length; i++) {
        if(children[i].type() === 'element') {
          promises.push(this.addMemberChild(children[i], cache, log, this.Members[name]));
        }
      }
      return Promise.all(promises);
    }
  }

  addMemberChild(element, cache, log, member) {
    let elemName = element.name();
    switch(elemName) {
      case 'Annotation':
        if(member.Annotations === undefined) {
          member.Annotations = {};
        }
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, member.Annotations);
      default:
        return Promise.reject(new Error('Unknown element name '+elemName));
    }
  }

  postProcess(log) {
    delete this._index;
  }
}

module.exports = EnumType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
