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
  }

  parse(string, context) {
    let me = this;
    return new Promise(function(resolve, reject) {
      let doc = undefined;
      try {
        doc = xmljs.parseXml(string);
      } catch(e) {
        reject(e);
      }
      let root = doc.root();
      try {
        me.metadata = new Metadata();
        let metaPromise = me.metadata.parse(root, me.options.cache);
        metaPromise.then(resolve).catch(reject);
      } catch(e) {
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
      callback(null, metadata);
    }).catch(function(err) {
      callback(err, null);
    });
  }
  catch(e) {
    callback(e, null);
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
