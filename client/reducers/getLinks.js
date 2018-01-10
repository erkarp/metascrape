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
    console.log(action.link);
        return state.map(function(link)
        {
          console.log(link);
          if (link.link === action.link)
          {
            link.count++;
          }
          return link;
        })

    case 'SORT_LINKS':
        const sorter = action.criteria;

        let nextState = state.slice().sort(function (a, b) {
          if (a[sorter] < b[sorter]) { return -1 }
          if (a[sorter] > b[sorter]) { return 1 }
          return 0
        });

        return sorter === 'count' ? nextState.reverse() : nextState;

    default:
        return state;
  }
}