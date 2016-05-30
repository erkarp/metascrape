var express   = require('express');
var request   = require('request');
var cheerio   = require('cheerio');
var clean     = require('./unescape');
var validate  = require('./validate/validate');
var router    = express.Router()

module.exports = {

  getMetaData: function(c, obj) {
    var desc = c('meta[name=description]').attr('content');
    obj.description = clean(desc) || null;
    obj.title = clean(c('title').html()) || null;
    return obj;
  },


  validate: function(href, page) {
    return validate.link(href, page);
  }

}
