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

  parse(xmlElement, cache) {
    return super.parse(xmlElement, cache, 'Metadata');
  }

  parseText(string, cache) {
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
        let metaPromise = me.parse(root, cache);
        metaPromise.then(resolve).catch(reject);
      } catch(e) {
        reject(e);
      }
    });
  }

  addElement(element, cache) {
    let elemName = element.name();
    switch(elemName) {
      case 'Reference':
        let ref = new Reference();
        this.References.push(ref);
        return ref.parse(element, cache);
      case 'DataServices':
        let ds = new DataServices();
        let promise = ds.parse(element, cache);
        let me = this; 
        return new Promise(function(resolve, reject) {
          promise.then(function() {
            ds.addToMetadata(me);
            resolve(null);
          }).catch(reject);
        });
      default:
        throw new Error('Unknown element name '+element.name());
        break;
    }
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

Metadata.prototype.parse = function(string, callback, context) {
  this.reallyDone = callback;
  this.context = context;
  try {
    var doc = xmljs.parseXml(string);
  } catch(e) {
    this.done(e);
  }
  var root = doc.root();
  var parseElement = this.parseElement.bind(this);
  try {
    ParserCommon.parseEntity(root, 'Metadata', parseElement);
  }
  catch(e) {
    this.done(e);
  }
  this.done(null); 
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

Metadata.prototype.parseDataServices = function(dataServices) {
  var parseElement = this.parseDataServiceElement.bind(this);
  try {
    ParserCommon.parseEntity(dataServices, 'DataService', parseElement);
  }
  catch(e) {
    this.done(e);
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
