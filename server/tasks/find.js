var cheerio = require('cheerio');
var clean = require('./unescape');

var find = {

  metaData: function(body, object)
  {
    let desc = cheerio('meta[name=description]', body).attr('content');
    let title = cheerio('title').text();

    desc = clean(desc)    || '';
    title = clean(title)  || '';
 
    return Object.assign({ desc, title }, object);
  },

  elements: function(body, object, elements)
  {
    elements.forEach(function(elem)
    {
      object[elem] = [];

      cheerio(elem, body).each(function()
      {
        let text = clean(cheerio(this).text());
        
        if (text)
        {
          object[elem].push(text);
        }
      });
    });

    return object;
  }

};


module.exports = find;
