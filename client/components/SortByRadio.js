import { Component } from 'react'
import { connect } from 'react-redux'
import { updateSorter, sortLinkList } from '../actions'

const mapStateToProps = (state) => {
  return {
    sorter: state.getSort
  };
}

const mapDispatchToProps = (dispatch) => {
	return { 
		update: (criteria) => { dispatch(updateSorter(criteria)) },
		resort: (criteria) => { dispatch(sortLinkList(criteria)) }
	}
};

class SortByRadio extends Component {

	change(event) {
		this.props.update(event.target.value);
		this.props.resort(event.target.value);
	}

	render () 
	{
		const criteria = this.props.criteria;

		return (
			<label>{this.props.label}
				<input type="radio"
					value={criteria} 
					onChange={(e) => this.change(e)}
					checked={this.props.sorter === criteria} />
			</label>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByRadio);