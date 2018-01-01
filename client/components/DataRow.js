import { Component } from 'react'

class DataRow extends Component {
	render ()
	{
		return (
	  		<tr>
	  			<td>{this.props.name}</td>
	  			<td>{this.props.data}</td>
	  		</tr>
		)
	}
}

export default DataRow;