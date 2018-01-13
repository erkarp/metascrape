import { Component } from 'react'

class DataRow extends Component {

	render () {
		const data = this.props.data;
		const info = this.props.info;

		return (
	  		<div className={'row ' + info.name} data-label={info.label}>
  			{
  				(typeof data === 'string' || typeof data === 'number') ? 
	  				data : (typeof data[0] === 'number') ? 
	  				data.join(', ') : data.map((item, i) => {
	  					return(<div key={i}>{item}</div>)
  				})
  			}
	  		</div>
		)
	}
}

export default DataRow;