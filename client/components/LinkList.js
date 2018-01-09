import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateStyles } from '../actions'
import LinkItem from './LinkItem.js'

const mapStateToProps = (state) => {
  return { 
    links: state.getLinks,
    style: state.getStyles
  };
};

class LinkList extends Component 
{
  render () {

    return (
        <ul className={this.props.style.join(' ')}>
            {
              this.props.links.map((link, i) => {
                return (<LinkItem key={i} data={link}></LinkItem>)
              })
            }
        </ul>
    )
  }
}

export default connect(mapStateToProps)(LinkList);