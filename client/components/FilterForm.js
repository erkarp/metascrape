import { Component } from 'react'
import Checkbox from './Checkbox'
import checkboxes from '../data/tagData'

class FilterForm extends Component 
{
	render () 
	{
		return (
	  		<form className="well tagsForm">
	  		{
	  			checkboxes.map((checkbox, i) => {
	  				return (<Checkbox key={i} info={checkbox} />)
	  			})
	  		} 		
	  		</form>
		)
	}
}

export default FilterForm;