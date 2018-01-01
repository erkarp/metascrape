import { Component } from 'react'
import Row from './DataRow'

class LinkItem extends Component {
	render ()
	{
		const data = this.props.data;

		return (
			<tbody>
				<Row name="Link" data={data.link} />
				{data.title.length ? <Row name="Title" data={data.title} /> : undefined}
				{data.desc.length ? <Row name="Description" data={data.desc} /> : undefined}
			</tbody>
	  )
	}
}

export default LinkItem;