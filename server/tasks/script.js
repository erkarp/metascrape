var parse     = require('url-parse');
var validate  = require('./validate/validate');
var remove    = require('./validate/remove');
var utils     = require('./utils');

module.exports = {

  removeHash: function(href)
  {
    var hash = href.indexOf('#');
    if (hash > -1)
    {
      href = href.slice(0, hash);
    }

    if (href.length > 0)
    {
      return href;
    }
  },

  checkList: function(list, link, io) {

    var url = parse(link),
        domain = remove.protocol(url),
        links = utils.sortAndFilter(list),
        input = { url: url, domain: domain };

    links = links.reduce(function(arr, link, i)
    {
      var validated = validate.link(link, input);

      if (validated)
      {
        arr.push(validated);
      }

      return arr;
    },[]);

    return links;
  }

};
