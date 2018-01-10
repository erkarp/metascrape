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
	  			<div>
		  			<SortByRadio criteria="index" label="Index" />
		  			<SortByRadio criteria="count" label="Count" />
		  			<SortByRadio criteria="link" label="URL" />
		  			<SortByRadio criteria="title" label="Title" />
		  			<SortByRadio criteria="desc" label="Description" />
	  			</div>
	  			<hr/>
	  			<div>
					{checkboxes.map((checkbox, i) => {
		  				return (<Checkbox key={i} info={checkbox} />)
		  			})} 
	  			</div>

	  			
	  					
	  		</form>
		)
	}
}

export default FilterForm;