const fileCache = require('./fileCache');
const Metadata = require('../Metadata');

class CSDLCache{
  constructor(options) {
    this.options = options || {};
    if(this.options.useLocal === undefined) {
      this.options.useLocal = null;
    }
    if(this.options.useNetwork === undefined) {
      this.options.useNetowk = true;
    }
    this.fileCache = new fileCache(this.options.localDirs, this.options.useNetwork);
    this.csdlCache = {};
    this.metadataCache = [];
  }

  getMetadata(uri) {
    let self = this;
    if(this.csdlCache[uri] === undefined) {
      this.csdlCache[uri] = new Promise(function(resolve, reject) {
        let filePromise = self.getFile(uri);
        filePromise.then(function(text) {
          let meta = new Metadata();
          let metaPromise = meta.parseText(text, self);
          metaPromise.then(function(metadata) {
            self.metadataCache.push(metadata);
            resolve(metadata);
          }).catch(reject);
        }).catch(reject);
      });
    }
    return this.csdlCache[uri];
  }

  getFile(uri) {
    return this.fileCache.getFile(uri);
  }

  clear() {
    this.fileCache.cache = {};
    this.csdlCache = {};
    this.metadataCache = [];
  }

  hasMetadata(uri) {
    return (this.csdlCache[uri] !== undefined);
  }
}

module.exports = CSDLCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
