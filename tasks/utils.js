module.exports = {

  sortAndFilter: function(list) {

    return list.sort(function(a,b) {
      return (a > b) ? 1 : ((b > a) ? -1 : 0);
    })

    .filter(function(elem, i, arr) {
      if (i === 0) { return true; }

      if (arr[i] === arr[i-1] ||
        arr[i] === arr[i-1] + '/') {
          return false;
        }

      return true;
    });

  }

}
