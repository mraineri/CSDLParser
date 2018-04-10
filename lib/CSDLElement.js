'use strict';

class CSDLElement {
  parse(xmlElement, cache, elementName, log) {
    log.trace('Parsing %s', this.constructor.name);
    let promises = [];
    if(this.addElement !== undefined) {
      promises = promises.concat(this.addElements(xmlElement.childNodes(), elementName, cache, log));
    }
    if(this.addAttribute !== undefined) {
      promises = promises.concat(this.addAttributes(xmlElement.attrs(), elementName, cache, log));
    }
    let me = this;
    return new Promise(function(resolve, reject) {
      Promise.all(promises).then(function(children) {
        if(me.postProcess !== undefined) {
          me.postProcess(log);
        }
        resolve(me);
      }).catch(function(err) {
        log.fatal(err);
        reject(err);
      });
    });
  }

  addElements(children, elementName, cache, log) {
    let promises = [];
    for(let i = 0; i < children.length; i++) {
      switch(children[i].type()) {
        case 'element':
          promises.push(this.addElement(children[i], cache, log));
          break;
        case 'text':
          promises.push(this.textCheck(children[i], elementName, log));
          break;
        case 'comment':
          //Ignore comments
          break;
      }
    }
    return promises;
  }

  textCheck(element, elementName, log) {
    let text = element.toString().trim();
    if(text.length !== 0) {
      return Promise.reject(new Error('Unknown text element in '+entityName+'! Text = "'+text+'"'));
	  }
    return Promise.resolve(this);
  }

  addSimpleElement(element, cache, log, nameProp, type, parentElem) {
    parentElem = parentElem || this;
    let simple = new type(element, cache);
    if(nameProp === '') {
      parentElem.push(simple);
    }
    else {
      parentElem[element.attr(nameProp).value()] = simple;
    }
    return simple.parse(element, cache, log);
  }

  pushSimpleElement(element, cache, log, type, parentElem) {
    parentElem = parentElem || this;
    let simple = new type(element, cache);
    parentElem.push(simple);
    return simple.parse(element, cache, log);
  }

  addDirectElement(element, cache, log, name, type, parentElem) {
    parentElem = parentElem || this;
    let simple = new type(element, cache);
    this[name] = simple;
    return simple.parse(element, cache, log);
  }

  addTextElement(element, cache, log, name, parentElem) {
    parentElem = parentElem || this;
    if(name === '') {
      parentElem.push(element.text());
    }
    else {
      parentElem[name] = element.text();
    }
    return Promise.resolve(this);
  }

  addAttributes(attributes, elementName, cache, log) {
    let promises = [];
    for(let i = 0; i < attributes.length; i++) {
      promises.push(this.addAttribute(attributes[i], cache, log));
    }
    return promises;
  }

  addBoolenAttribute(attribute, name) {
    let me = this;
    return new Promise(function(resolve, reject) {
      let value = attribute.value();
      if(value === 'true') {
        me[name] = true;
        resolve(me);
      }
      else if(value === 'false') {
        me[name] = false;
        resolve(me);
      }
      else {
        reject(new Error('Unknown value '+value+' for attribute named '+name));
      }
    });
  }

  addIntAttribute(attribute, name) {
    let me = this;
    return new Promise(function(resolve, reject) {
      try {
        let value = parseInt(attribute.value(), 10);
        me[name] = value;
        resolve(me);
      }
      catch(err) {
        reject(err);
      }
    });
  }

  addSimpleAttribute(attribute, name) {
    let me = this;
    return new Promise(function(resolve, reject) {
      me[name] = attribute.value();
      resolve(me);
    });
  }

  alreadyHandled() {
    return Promise.resolve(this);
  }

  search(elementType, elementName, includeReferences) {
    let ret = [];
    if(elementType === undefined || elementType === this.constructor.name) {
      //Found type
      if(elementName === undefined || (elementName === this.Name || elementName === this.Term)) {
        ret.push(this);
      }
    }
    ret = ret.concat(this.searchChildren(this, elementType, elementName, includeReferences));
    return ret;
  }

  elementValid(element) {
    return ((element !== undefined) && (element !== null) && (typeof element === 'object') && (element.search !== undefined))
  }

  searchChildren(parent, elementType, elementName, includeReferences) {
    let ret = [];
    for(let key in parent) {
      let element = parent[key];
      if(this.elementValid(element)) {
        let child = element.search(elementType, elementName);
        ret = ret.concat(child);
      }
      else if (typeof element === 'object'){
        if(key === 'References') {
          if(includeReferences) {
            ret = ret.concat(this.searchChildren(element, elementType, elementName, includeReferences));
          }
        }
        else if(key === 'Annotations') {
          if(elementType === 'Annotation') {
            ret = ret.concat(this.searchChildren(element, elementType, elementName, includeReferences));
          }
        }
        else {
          ret = ret.concat(this.searchChildren(element, elementType, elementName, includeReferences));
        }
      }
    }
    return ret;
  }
}

module.exports = CSDLElement;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
