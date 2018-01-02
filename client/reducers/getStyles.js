const tags = ['link', 'title', 'description'];

export default function stylesReducer(state=tags, action) 
{
  switch(action.type)
  {
    case 'ADD_STYLE': 
    	return state.concat(action.className);
	case 'REMOVE_STYLE':
		return state.filter(className => className !== action.className);
    default:
    	return state;
  }
}