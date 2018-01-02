import { Component } from 'react'

class DataRow extends Component {

	render ()
	{
		const data = this.props.data;
		const info = this.props.info;

		return (
	  		<tr className={'row ' + info.name}>
	  			<td className="name">{info.label}</td>
	  			<td className="data"> 
	  			{
	  				(typeof data === 'string') ? data :
	  				data.map((item, i) => {
	  					return(<div key={i}>{item}</div>)
	  				})
	  			}
	  			</td>
	  		</tr>
		)
	}
}

export default DataRow;