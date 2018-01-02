import { Component } from 'react'
import Row from './DataRow'
import constants from '../data/tagData'

class LinkItem extends Component {
	render ()
	{
		return (
			<li>{
				constants.map((info, i) => {
					return (<Row data={this.props.data[info.tag]} info={info} key={i} />)
				})
			}</li>
	  )
	}
}

export default LinkItem;