'use strict';

const xmljs = require('libxmljs-mt');
const fs = require('fs');
const request = require('request');
const CSDLCache = require('./cache/csdlCache');

const Metadata = require('./Metadata');

class CSDL {
  constructor(options) {
    this.options = Object.assign({useLocal: null, useNetwork: true}, options);
    if(this.options.cache === undefined) {
      this.options.cache = new CSDLCache(this.options);
    }
    else {
      this.options.cache.useLocal = this.options.useLocal;
      this.options.cache.useNetwork = this.options.useNetwork;
    }
    if(this.options.logger === undefined) {
      this.log = {};
      this.log.trace = this.log.debug = this.log.info = this.log.warn = this.log.error = this.log.fatal = function() {};
    }
    else {
      this.log = this.options.logger;
    }
  }

  parse(string) {
    let me = this;
    let xmlPromise = this.stringToXML(string);
    return new Promise(function(resolve, reject) {
      xmlPromise.then(function(root) {
        let meta = new Metadata(root, me.options.cache, me.log);
        let metaPromise = meta.parse(root, me.options.cache, me.log);
        metaPromise.then(resolve).catch(reject);
      }).catch(reject);
    });
  }

  stringToXML(string) {
    return new Promise(function(resolve, reject) {
      try {
        let doc = xmljs.parseXml(string);
        resolve(doc.root());
      }
      catch(e) {
        reject(e);
      }
    });
  }
}

module.exports.CSDL = CSDL;

module.exports.parseMetadata = function(string, options, callback) {
  try {
    let csdl = new CSDL(options);
    let promise = csdl.parse(string);
    promise.then(function(metadata) {
      return callback(null, metadata);
    }).catch(function(err) {
      return callback(err, null);
    });
  }
  catch(e) {
    return callback(e, null);
  }
}

module.exports.parseMetadataFile = function(filename, options, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err) {
      callback(err, null);
    }
    module.exports.parseMetadata(data, options, callback);
  });
}

module.exports.parseMetadataUri = function(uri, options, callback) {
  request.get(uri, function(error, request, body) {
    if(error) {
      callback(error, null);
    }
    module.exports.parseMetadata(body, options, callback);
  });
}
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
