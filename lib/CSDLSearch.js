function searchCSDL(root, elementType, elementName, includeReferences) {
  return root.search(elementType, elementName, includeReferences); 
}

function remapNamespace(references, namespace) {
  for(var i = 0; i < references.length; i++) {
    if(references[i].Includes[namespace] !== undefined) {
      return references[i].Includes[namespace];
    }
  }
  return undefined;
}

function getTypeInfo(typeName) {
  let index = typeName.lastIndexOf('.');
  if(index === -1) {
    return null;
  }
  let ret = {};
  ret.namespace = typeName.substring(0, index);
  ret.type = typeName.substring(index+1);
  return ret;
}

function getSchemaByNamespace(metadata, namespace) {
  let schema = metadata[namespace];
  if(schema !== undefined) {
    return schema;
  }
  schema = metadata._options.cache.getSchema(namespace);
  if(schema !== undefined) {
    return schema;
  }
  if(metadata.References === undefined) {
    return undefined;
  }
  namespace = remapNamespace(metadata.References, namespace);
  if(namespace === undefined) {
    return undefined;
  }
  return metadata._options.cache.getSchema(namespace);
}

function findByType(metadata, typeName) {
  let typeInfo = getTypeInfo(typeName);
  if(typeInfo === null) {
    return null;
  }
  else if(typeInfo.namespace === 'Edm') {
    return typeName;
  }
  let schema = getSchemaByNamespace(metadata, typeInfo.namespace);
  if(schema === undefined || schema[typeInfo.type] === undefined) { 
    return null;
  }
  return schema[typeInfo.type];
}

module.exports.search = searchCSDL;
module.exports.findByType = findByType;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
