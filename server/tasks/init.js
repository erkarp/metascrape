const findLinks = require('./parse')

export default function (url, io)
{
  var validLinkObjects = [], hrefs = [];

  request(url, function(error, response, body)
  {
    if (!error)
    {
      hrefs = findLinks(body, url, io); 
    }

    else
    {
      console.log("We’ve encountered an error: " + error);
      return error;
    }
  });
}