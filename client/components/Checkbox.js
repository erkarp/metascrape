import { Component } from 'react'

class Checkbox extends Component {

	render ()
	{
		return (
			<label>{this.props.name}
				<input type="checkbox" onChange={change}
					value="{this.props.name.toLowerCase()}" />
			</label>
		)
	}
}

export default Checkbox;