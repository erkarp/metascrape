export default function(state=0, action) 
{
  switch(action.type) 
  {
    case 'CHANGE_SORTER': 
      return action.criteria;

    default:
    	return state;
  }
}