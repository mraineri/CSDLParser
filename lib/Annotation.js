const assert = require('assert');
const Collection = require('./Collection')

function Annotation(xml) {
  var name = xml.attr('Term').value();
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
      throw new Error('Unknown element type in Annotation '+name+'!');
    }
  }
  var attributes = xml.attrs();
  for(var i = 0; i < attributes.length; i++)
  {
    this.parseAttribute(attributes[i], name);
  }
  return this;
}

Annotation.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    case 'Collection':
      this.Collection = new Collection(element);
      break;
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Annotation.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Term':
      //Already used... drop on floor
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Annotation '+entityName);
      break;
  }
}

module.exports = Annotation;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */