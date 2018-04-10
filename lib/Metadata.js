'use strict';

const CSDLElement = require('./CSDLElement');
const Reference = require('./Reference');
const DataServices = require('./DataServices');
const xmljs = require('libxmljs-mt');

class Metadata extends CSDLElement {
  constructor(root, cache) {
    super();
    this.References = [];
  }

  parse(xmlElement, cache, log) {
    return super.parse(xmlElement, cache, 'Metadata', log);
  }

  parseText(string, cache, log) {
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
        let metaPromise = me.parse(root, cache, log);
        metaPromise.then(resolve).catch(reject);
      } catch(e) {
        reject(e);
      }
    });
  }

  addElement(element, cache, log) {
    let elemName = element.name();
    switch(elemName) {
      case 'Reference':
        return this.pushSimpleElement(element, cache, log, Reference, this.References);
      case 'DataServices':
        return this.addDataServices(element, cache, log); 
      default:
        throw new Error('Unknown element name '+element.name());
        break;
    }
  }

  addDataServices(element, cache, log) {
    let ds = new DataServices();
    let promise = ds.parse(element, cache, log);
    let me = this; 
    return new Promise(function(resolve, reject) {
      promise.then(function() {
        ds.addToMetadata(me);
        resolve(null);
      }).catch(reject);
    });
  }
}
module.exports = Metadata;
/*

Metadata.prototype.done = function(error) {
  if(this.reallyDone !== undefined) { 
    var callback = this.reallyDone;
    delete this.reallyDone;
    if(this.context !== undefined) { 
      callback = callback.bind(this.context);
      delete this.context;
    }
    if(this._options.cache) {
      this._options.cache.addMetadata(this);
    }
    callback(error, this);
  }
}

Metadata.prototype.resolve = function(callback) {
  var prom = this.resolvePromise();
  prom.then(function(data) {
    callback(null, data);
  }).catch(function(error) {
    callback(error, null);
  });
}

Metadata.prototype.resolvePromise = function() {
  var self = this;
  if(this.References === undefined || this.References.length === 0) {
    delete this.context;
    return new Promise(function(resolve, reject) {
      resolve(self);
    });
  }
  else {
    return new Promise(function(resolve, reject) {
      self._options.cache.waitForCoherent(function(error) {
        if(error) {
          reject(error);
        }
        else {
          resolve(self);
        }
      });
    });
  }
}

Metadata.prototype.parseDataServiceElement = function(element) {
  var elemName = element.name();
  switch(elemName) {
    case 'Schema':
      var namespace = element.attr('Namespace').value();
      var Schema = require('./Schema');
      this[namespace] = new Schema(element);
      break;
    default:
      throw new Error('Unknown element name '+element.name());
      break;
  }
}
*/

/* vim: set tabstop=2 shiftwidth=2 expandtab: */
