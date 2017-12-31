import { Component } from 'react'

class LinkItem extends Component {
	render ()
	{
	  return (
	      <tr><td>{this.props.url}</td></tr>
	  )
	}
}

export default LinkItem;