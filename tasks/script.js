var express   = require('express');
var request   = require('request');
var cheerio   = require('cheerio');
var parse     = require('url-parse');
var clean     = require('./unescape');
var validate  = require('./validate/validate');
var remove    = require('./validate/remove');
var utils     = require('./utils');
var router    = express.Router();

module.exports = {

  getMetaData: function(c, obj) {
    var desc = c('meta[name=description]').attr('content');
    obj.description = clean(desc) || null;
    obj.title = clean(c('title').html()) || null;
    return obj;
  },

  removeHash: function(href) {
    var hash = href.indexOf('#');
    if (hash > -1) {
      href = href.slice(0, hash);
    }

    if (href.length > 0) {
      return href;
    }
  },

  checkList: function(list, origURL) {

    var url = parse(origURL),
        domain = remove.protocol(url),
        input = { url: url, domain: domain },
        links = utils.sortAndFilter(list);

    links = links.reduce(function(arr, link, i) {
      var validated = validate.link(link, input);
      if (validated) { arr.push(validated); }
      return arr;
    },[]);

    console.log('LINKS ~~ ', links);
    return links;
  }

}
