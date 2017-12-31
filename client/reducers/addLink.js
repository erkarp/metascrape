export default function newLinkReducer(state=[], action) 
{
  switch(action.type) 
  {
    case 'ADD_LINK': 
    	return state.concat(action.incomingLink);
    default:
    	return state;
  }
}