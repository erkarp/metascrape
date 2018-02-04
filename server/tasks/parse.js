export default function (text, input, io)
{
  const url = new URL(input), 
        list = [url.origin + url.pathname],
        inputHostname = url.hostname;

  cheerio('a', text).each(function(i, elem)
  {
    let href = cheerio(this).attr('href');

    try 
    {
      href = new URL(href)
    } 
    catch(e) 
    {
      href = new URL(href, url.origin + url.pathname)
    }
    finally 
    {
      if (href && href.hostname === inputHostname)
      {
          let pathname = href.pathname.replace(/\/$/, '');
          let link = href.origin + pathname;

          if (list.includes(link))
          {
            (function(linkIndex) {

              const index = linkIndex;
              
              setTimeout(function() {
                io.emit('count', { link, index })
              }, 5000);

            })(list.length)
          }

          else {
            let index = list.length;

            request(link, function(error, response, body)
            {
              const elements = ['h1', 'h2', 'p'];
              let linkObject = { link, index:[index], count: 1 };
      
              linkObject = find.metaData(body, linkObject);
              linkObject = find.elements(body, linkObject, elements);

              io.emit('news', linkObject);
            });
          }

          list.push(link);
      }
    }
  });

  console.log('\nLIST:\n', list);
}