export function addIncomingLink(incomingLink, criteria) 
{
	return criteria ? 
	{
		incomingLink, type: 'INSERT_LINK_IN_ORDER', criteria
	} : {
		incomingLink, type: 'ADD_LINK'
	}
}

export function updateStyles(className, checked) 
{
	return checked ? 
	{
		className, type: 'ADD_STYLE'
	} : {
		className, type: 'REMOVE_STYLE'
	}
}

export function sortLinkList(criteria)
{
	return { criteria, type: 'SORT_LINKS' }
}

export function updateSorter(criteria)
{
	return { criteria, type: 'CHANGE_SORTER' }
}