import { Component } from 'react'
import Row from './DataRow'
import constants from '../data/tagData'

class LinkItem extends Component {
	render ()
	{
		return (
			<tbody>{
				constants.map((info, i) => {
					return (<Row data={this.props.data[info.tag]} info={info} key={i} />)
				})
			}</tbody>
	  )
	}
}

export default LinkItem;