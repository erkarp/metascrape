var validate = require('./validate/validate');
var remove   = require('./validate/remove');
var utils    = require('./utils');

module.exports = 
{
  checkList: function(list, link, io) {

    let
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
