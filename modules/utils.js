'use strict';

export function slugify(text){
  return text.replace(/[\&]/g, 'and')
             .replace(/[\@]/g, 'at')
             .replace(/\s/g, '-')
             .replace(/[^\w]/g, '');
}

export function isNullOrWhitespace(text) {
  return text === null || text === "" || (text && text.match(/^\s+$/)) !== null;
}

export function getImage(cast, raw) {
   var itimage = raw['itunes:image'];
   var regimage = raw.image;

  if (itimage && itimage.$){
    return itimage.$.href;
  } else if(regimage && regimage.url) {
    return regimage.url;
  } else {
    return cast.image || "";
  }
}


export function collapse(raw) {
  if (typeof raw !== "object")
    return raw;

  var result = {};
  for (var key in raw){
    var property = raw[key];

    if (isArray(property)) {
      if (property.length === 1 && key !== "item") {
        result[key] = exports.collapse(property[0]);
      }
      else if (property.length > 1 || key === "item") 
        result[key] = property.map((item) => exports.collapse(item))
                              .map((item) => {
                                      if (item.$)
                                        return item.$;
                                      else 
                                        return item;
                              });
    } else if(property && typeof property === "object"){
      var res = exports.collapse(property);

      if (res.$) 
        result[key] = res.$;
      else  
        result[key] = res;

     } else {
      result[key] = property;
    }
  }

  return result;
}


function isArray(item){
  return item && item.push && item.length && item.pop;
}
