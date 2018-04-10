'use strict';

const CSDLElement = require('./CSDLElement');
const Action = require('./Action');
const Annotation = require('./Annotation');
const ComplexType = require('./ComplexType');
const EntityContainer = require('./EntityContainer');
const EntityType = require('./EntityType');
const EnumType = require('./EnumType');
const Function = require('./Function');
const Term = require('./Term');
const TypeDefinition = require('./TypeDefinition');

class Schema extends CSDLElement {
  constructor(root, cache) {
    super();
    this.Annotations = {};
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Schema', log);
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Action':
        return this.addSimpleElement(element, cache, log, 'Name', Action);
      case 'Annotation':
        return this.addSimpleElement(element, cache, log, 'Term', Annotation, this.Annotations);
      case 'ComplexType':
        return this.addSimpleElement(element, cache, log, 'Name', ComplexType);
      case 'EntityContainer':
        return this.addSimpleElement(element, cache, log, 'Name', EntityContainer);
      case 'EntityType':
        return this.addSimpleElement(element, cache, log, 'Name', EntityType);
      case 'EnumType':
        return this.addSimpleElement(element, cache, log, 'Name', EnumType);
      case 'Function':
        return this.addSimpleElement(element, cache, log, 'Name', Function);
      case 'Term':
        return this.addSimpleElement(element, cache, log, 'Name', Term);
      case 'TypeDefinition':
        return this.addSimpleElement(element, cache, log, 'Name', TypeDefinition);
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown element name '+elemName));
        });
    }
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'Namespace':
        return this.addSimpleAttribute(attribute, '_Name');
      case 'Alias':
        return this.addSimpleAttribute(attribute, '_Alias');
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('Unknown attribute name '+attrName));
        });
    }
  }
}

module.exports = Schema;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
