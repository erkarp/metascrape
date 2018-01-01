import { Component } from 'react'

class DataRow extends Component {

	render ()
	{
		return (
	  		<tr className={'row ' + this.props.name.toLowerCase()}>
	  			<td className="name">{this.props.name}</td>
	  			<td className="data">{this.props.data}</td>
	  		</tr>
		)
	}
}

export default DataRow;