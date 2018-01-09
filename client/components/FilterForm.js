import { Component } from 'react'
import Checkbox from './Checkbox'
import SortByRadio from './SortByRadio'
import checkboxes from '../data/tagData'

class FilterForm extends Component 
{
	render () 
	{
		return (
	  		<form className="well tagsForm">
	  			Sort by: 
	  			<SortByRadio criteria="link" label="URL" />
	  			<SortByRadio criteria="title" label="Title" />

	  			{checkboxes.map((checkbox, i) => {
	  				return (<Checkbox key={i} info={checkbox} />)
	  			})} 		
	  		</form>
		)
	}
}

export default FilterForm;