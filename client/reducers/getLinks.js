export default function(state=[], action)
{
  switch(action.type) 
  {
    case 'ADD_LINK': 
        return state.concat(action.incomingLink);

    case 'INSERT_LINK_IN_ORDER':
        const { criteria, incomingLink } = action;
        
        return state.reduce(function(link, i, nextState)
        {
          if (link[criteria] > incomingLink[criteria])
          {
            nextState.push(incomingLink);
          }

            return nextState.push(link);
        }, []);

    case 'INCREMENT_COUNT':
        return state.map(function(link)
        {
          if (link.link === action.link)
          {
            link.count++;
            link.index.push(action.index);
          }
          return link;
        })

    case 'SORT_LINKS':

        switch (action.criteria)
        {
          case 'count':
            return state.slice().sort(function (a, b) {
              const valA = parseInt(a.count),
                    valB = parseInt(b.count); 

              if (valA < valB) { return -1 }
              if (valA > valB) { return 1 }
              return 0
            }).reverse();

          case 'index':
            return state.slice().sort(function (a, b) {
              const valA = parseInt(a.index[0]),
                    valB = parseInt(b.index[0]); 

              if (valA < valB) { return -1 }
              if (valA > valB) { return 1 }
              return 0
            });

          default: 
            return state.slice().sort(function (a, b) {
              const valA = a[action.criteria],
                    valB = b[action.criteria]; 

              if (valA < valB) { return -1 }
              if (valA > valB) { return 1 }
              return 0
            });
        }

    default:
        return state;
  }
}