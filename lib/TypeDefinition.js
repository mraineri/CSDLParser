const assert = require('assert');

function TypeDefinition(metadata, xml) {
  this._metadata = metadata;
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
      throw new Error('Unknown element type in NavigationProperty '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

TypeDefinition.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

TypeDefinition.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in NavigationProperty '+entityName);
      break;
  }
}

module.exports = TypeDefinition;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */