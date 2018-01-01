import { Component } from 'react'
import { connect } from 'react-redux'
import { updateStyles } from '../actions'

const mapStateToProps = (state) => {
  return {
    classList: state.getStyles
  };
}

const mapDispatchToProps = (dispatch) => {
	return { 
		styles: (style, checked) => { dispatch(updateStyles(style, checked)) }
	}
};

class FilterForm extends Component 
{
	change(event) {
		this.props.styles(event.target.value, event.target.checked);
	}

	render () {
		return (
	  		<form>
				<label>Links
					<input type="checkbox" value="links" 
							onChange={(e) => this.change(e)}
							checked={this.props.classList.includes('links')} />
				</label>

				<label>Titles
					<input type="checkbox" value="titles" 
							onChange={(e) => this.change(e)}
							checked={this.props.classList.includes('titles')} />
				</label>

				<label>Descriptions
					<input type="checkbox" value="descriptions" 
							onChange={(e) => this.change(e)}
							checked={this.props.classList.includes('descriptions')} />
				</label>	  		
	  		</form>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);