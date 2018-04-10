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

  parse(string, context) {
    let me = this;
    this.log.trace({string: string, context: context}, 'parse. Entered.');
    return new Promise(function(resolve, reject) {
      let doc = undefined;
      try {
        doc = xmljs.parseXml(string);
      } catch(e) {
        this.log.fatal(e);
        reject(e);
      }
      let root = doc.root();
      try {
        me.metadata = new Metadata(root, me.options.cache, me.log);
        let metaPromise = me.metadata.parse(root, me.options.cache, me.log);
        me.log.trace({metaPromise: metaPromise}, 'waiting for promise...');
        metaPromise.then(function(metadata) {
          me.log.trace('Promise resolved');
          resolve(metadata);
        }).catch(function(err) {
          me.log.trace(err, 'Promise rejected');
          reject(err);
        });
      } catch(e) {
        me.log.fatal(e);
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
