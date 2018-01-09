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

    case 'SORT_LINKS':
        const sorter = action.criteria;
        console.log('SORT', action);

        return state.slice().sort(function (a, b) {
          if (a[sorter] < b[sorter]) { return -1 }
          if (a[sorter] > b[sorter]) { return 1 }
          return 0
        });

    default:
        return state;
  }
}