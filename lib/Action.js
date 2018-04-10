'use strict';

const Function = require('./Function');

class Action extends Function {
  constructor() {
    super();
  }

  addAttribute(attribute, cache) {
    let attrName = attribute.name();
    switch(attrName) {
      case 'IsBound':
        return this.addBoolenAttribute(attribute, attrName);
      case 'Name':
        return this.alreadyHandled();
      default:
        return Promise.reject(new Error('Unknown attribute name '+attrName));
    }
  }
}

module.exports = Action;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
