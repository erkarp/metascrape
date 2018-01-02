import { Component } from 'react'
import { connect } from 'react-redux'
import { updateStyles } from '../actions'

const mapStateToProps = (state) => {
  return {
    classes: state.getStyles
  };
}

const mapDispatchToProps = (dispatch) => {
	return { 
		classStyles: (style, checked) => { dispatch(updateStyles(style, checked)) }
	}
};

class Checkbox extends Component {

	change(event) {
		this.props.classStyles(event.target.value, event.target.checked);
	}

	render ()
	{
		const name = this.props.info.name;

		return (
			<label>{this.props.info.label}
				<input type="checkbox" value={name}
						onChange={(e) => this.change(e)}
						checked={this.props.classes.includes(name)} />
			</label>	
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);