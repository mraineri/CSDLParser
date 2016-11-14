function Property(entity, xml) {
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
  this._entity = entity;
  return this;
}

Property.prototype.parseElement = function(element, entityName) {
  var elemName = element.name();
  switch(elemName) {
    default:
      throw new Error('Unknown element name '+elemName);
      break;
  }
}

Property.prototype.parseAttribute = function(attribute, entityName) {
  var attrName = attribute.name();
  switch(attrName) {
    case 'Name':
      //Already used... drop on floor
      break;
    case 'Type':
      this.Type = attribute.value();
      break;
    case 'Nullable':
      this.parseBooleanAttribute(attribute, attrName);
      break;
    default:
      throw new Error('Unknown attribute name '+attrName+' in Property '+entityName);
      break;
  }
}

Property.prototype.parseBooleanAttribute = function(xml, name) {
  var value = xml.value();
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

module.exports = Property;