'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');

class FileCache {
  constructor(localDirs, useNetwork) {
    this.cache = {};
    if(localDirs === undefined) {
      localDirs = null;
    }
    if(useNetwork === undefined) {
      useNetwork = true;
    }
    this.localDirs = localDirs;
    this.useNetwork = useNetwork;
  }

  hasFile(uri) {
    return (this.cache[uri] !== undefined);
  }

  getFile(uri, log) {
    let self = this;
    if(self.cache[uri] !== undefined) {
      return self.cache[uri];
    }
    let localPromise = self.getLocalFile(uri, log);
    let caller = new Error().stack;
    return new Promise(function(resolve, reject) {
      localPromise.then(resolve).catch(function() {
        let netPromise = self.getRemoteFile(uri, log);
        netPromise.then(resolve).catch(reject);
      });
    });
  }

  getSingleLocalFile(filename) {
    return new Promise(function(resolve, reject) {
      fs.readFile(filename, 'utf8', (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      });
    });
  }

  getLocalFile(uri, log) {
    log.trace({uri: uri, log: log}, 'getLocalFile entered.');
    if(this.localDirs === null) {
      return Promise.reject('Local files disabled');
    }
    let index = uri.lastIndexOf('/');
    let filename = uri.substring(index+1);
    if(typeof this.localDirs === 'string') {
      this.localDirs = [this.localDirs];
    }
    let promises = [];
    for(let i = 0; i < this.localDirs.length; i++) {
      promises.push(this.getSingleLocalFile(path.join(this.localDirs[i], filename)));
    }
    return new Promise(function(resolve, reject) {
      for(let i = 0; i < promises.length; i++) {
        promises[i].then(resolve).catch(reject);
      }
      reject(new Error('Unable to get local file'));
    });
  }

  getRemoteFile(uri, log) {
    return new Promise(function(resolve, reject) {
      request.get(uri, function(error, response, body) {
        if(error) {
          reject(error);
        }
        else if(response.statusCode !== 200) {
          reject(new Error('Unable to find URI '+uri));
        }
        else {
          resolve(body);
        }
      });
    });
  }
}

module.exports = FileCache;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
