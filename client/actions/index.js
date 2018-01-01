export function addIncomingLink(incomingLink) {
	return { type: 'ADD_LINK', incomingLink }
};

export function updateStyles(className, checked) {
	console.log('in update styles', className, checked)
	return checked ? {
		type: 'ADD_STYLE', className
	} : {
		type: 'REMOVE_STYLE', className
	}
}