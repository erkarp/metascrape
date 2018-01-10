export default function(state='index', action) 
{
  switch(action.type) 
  {
    case 'CHANGE_SORTER': 
      return action.criteria;

    default:
    	return state;
  }
}