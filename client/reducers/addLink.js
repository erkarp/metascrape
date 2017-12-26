export default function newLinkReducer(state=initialState.newLink, action) 
{
  switch(action.type) 
  {
    case 'ADD_LINK': 
      sessionStorage.setItem('newLink', action.payload)
      return action.payload;
    default:
      return sessionStorage.newLink || state
  }
}