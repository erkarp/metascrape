const request = require('request')
const findLinks = require('./parse')

module.exports = function init (url, io)
{
  var validLinkObjects = [], hrefs = [];

  request(url, function(error, response, body)
  {
    if (!error)
    {
      hrefs = findLinks(body, url, io); 
      delete response.body;
    }

    else
    {
      console.log("We’ve encountered an error: " + error);
      return error;
    }
  });
}