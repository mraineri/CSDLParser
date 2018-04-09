var CSDL = process.env.CSDL_COV ? require('./lib-cov/CSDL') : require('./lib/CSDL');
var CSDLCache = process.env.CSDL_COV ? require('./lib-cov/cache/csdlCache') : require('./lib/cache/csdlCache');
var CSDLSearch = process.env.CSDL_COV ? require('./lib-cov/CSDLSearch') : require('./lib/CSDLSearch');

//constants
module.exports.version = require('./package.json').version;

/// parse an XML string and return the CSDL object
module.exports.parseMetadata = CSDL.parseMetadata;

/// parse an XML file and return the CSDL object
module.exports.parseMetadataFile = CSDL.parseMetadataFile;

/// parse an XML URI and return the CSDL object
module.exports.parseMetadataUri = CSDL.parseMetadataUri;

/// Allow the caller access to the cache
module.exports.cache = CSDLCache;

/// Search a metadata for entity type and names
module.exports.search = CSDLSearch.search;

/// Search a metadata for entity type and names
module.exports.findByType = CSDLSearch.findByType;
