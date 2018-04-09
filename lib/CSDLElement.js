'use strict';

class CSDLElement {
  parse(xmlElement, cache, elementName) {
    let promises = [];
    if(this.addElement !== undefined) {
      promises.concat(this.addElements(xmlElement.childNodes(), elementName, cache));
    }
    if(this.addAttribute !== undefined) {
      promises.concat(this.addAttributes(xmlElement.attrs(), elementName, cache));
    }
    let me = this;
    return new Promise(function(resolve, reject) {
      Promise.all(promises).then(function(children) {
        resolve(me);
      }).catch(reject);
    });
  }

  addElements(children, elementName, cache) {
    let promises = [];
    for(let i = 0; i < children.length; i++) {
      switch(children[i].type()) {
        case 'element':
          promises.push(this.addElement(children[i], cache));
          break;
        case 'text':
          let text = children[i].toString().trim();
          if(text.length !== 0) {
            throw new Error('Unknown text element in '+entityName+'! Text = "'+text+'"');
	        }
          break;
        case 'comment':
          //Ignore comments
          break;
      }
    }
    return promises;
  }

  addAttributes(attributes, elementName, cache) {
    let promises = [];
    for(let i = 0; i < attributes.length; i++) {
      promises.push(this.addAttribute(attributes[i], cache));
    }
    return promises;
  }
}

module.exports = CSDLElement;
/* vim: set tabstop=2 shiftwidth=2 expandtab: */
