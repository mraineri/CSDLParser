var Metadata = require('./lib/Metadata');
var CSDLCache = require('./lib/cache/csdlCache');
var CSDLSearch = require('./lib/CSDLSearch');

//constants
module.exports.version = require('./package.json').version;

/// parse an XML string and return the CSDL object
module.exports.parseMetadata = Metadata.parseMetadata;

/// parse an XML file and return the CSDL object
module.exports.parseMetadataFile = Metadata.parseMetadataFile;

/// parse an XML URI and return the CSDL object
module.exports.parseMetadataUri = Metadata.parseMetadataUri;

/// Allow the caller access to the cache
module.exports.cache = CSDLCache;

/// Search a metadata for entity type and names
module.exports.search = CSDLSearch.search;

/// Search a metadata for entity type and names
module.exports.findByType = CSDLSearch.findByType;
