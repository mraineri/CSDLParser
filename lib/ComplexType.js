const assert = require('assert');

const Property = require('./Property');
const NavigationProperty = require('./NavigationProperty');

function ComplexType(metadata, xml) {
  this._metadata = metadata;
  this.Properties = {};
  var name = xml.attr('Name').value();
  var children = xml.childNodes();
  for(var i = 0; i < children.length; i++)
  {
    var elemType = children[i].type();
    if(elemType === 'element')
    {
      this.parseElement(children[i], name);
    }
    else
    {
      throw new Error('Unknown element type in EntityType '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

ComplexType.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Property':
      var name = element.attr('Name').value();
      this.Properties[name] = new Property(this, element);
      break;
    case 'NavigationProperty':
      var name = element.attr('Name').value();
      this.NavigationProperty[name] = new NavigationProperty(this, element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

ComplexType.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'BaseType':
      this.BaseType = attribute.value();
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in ComplexType '+entityName);
      break;
  }
}

ComplexType.prototype.parseBooleanAttribute = function(xml, name) {
  var attr = xml.attr(name);
  if(attr === null) {
    return;
  }
  var value = attr.value();
  if(value === 'true') {
    this[name] = true;
  }
  else if(value === 'false') {
    this[name] = false;
  }
  else {
    throw new Error('Unknown value '+value+' for attribute named '+name);
  }
}

module.exports = ComplexType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */