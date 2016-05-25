module.exports = function(safe) {

  if (safe) {
    return safe
     .replace(/&amp;/g, "&")
     .replace(/&lt;/g, "<")
     .replace(/&gt;/g, ">")
     .replace(/&#xA0;/g, " ")
     .replace(/&quot;/g, "\"")
     .replace(/&#x2019;/g, '\'')
     .replace(/&#039;/g, "'")
     .replace(/&apos;/g, "'");
   }

}
