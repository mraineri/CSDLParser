'use strict';

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

  getMetadata(uri, log) {
    log.info('Obtaining Metadata for URI %s', uri);
    if(this.csdlCache[uri] === undefined) {
      this.csdlCache[uri] = this.getCSDLPromise(uri, log);
    }
    return this.csdlCache[uri];
  }

  getCSDLPromise(uri, log) {
    let self = this;
    return new Promise(function(resolve, reject) {
      let filePromise = self.getFile(uri, log);
      filePromise.then(function(text) {
        let metaPromise = self.getMetadataPromise(text, log);
        metaPromise.then(function(metadata) {
          self.metadataCache.push(metadata);
          resolve(metadata);
        }).catch(reject);
      }).catch(function(err) {
        console.log('Here1');
        reject(err);
      });
    });
  }

  getMetadataPromise(text, log) {
    let meta = new Metadata();
    return meta.parseText(text, this, log);
  }

  getFile(uri, log) {
    return this.fileCache.getFile(uri, log);
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
