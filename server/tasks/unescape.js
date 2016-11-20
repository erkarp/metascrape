module.exports = function(safe) {

  if (safe)
  {
    return safe
     .replace(/&#xB7;/gi, "·")
     .replace(/&amp;/gi, "&")
     .replace(/&lt;/gi, "<")
     .replace(/&gt;/gi, ">")
     .replace(/&#xA0;/gi, " ")
     .replace(/&quot;/gi, "\"")
     .replace(/&#x2019;/gi, '\'')
     .replace(/&#039;/gi, "'")
     .replace(/&apos;/gi, "'")
     .replace(/&#x2013;/gi, "-");
   }

};
