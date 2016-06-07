var cheerio = require('cheerio');
var clean = require('./unescape');

var find = {

  metaData: function(c, obj) {
    var desc = c('meta[name=description]').attr('content');
    obj.description = clean(desc) || null;
    obj.title = clean(c('title').html()) || null;
    return obj;
  },

  elements: function(c, obj, elems) {
    elems.forEach(function(elem) {
      obj[elem] = clean(c(elem).html()) || null;
    })
    return obj;
  }

}


module.exports = find;
