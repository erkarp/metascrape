import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LinkItem from './LinkItem.js'


const mapStateToProps = (state) => {
  return { links: state.addLink };
}

class LinkList extends Component 
{
  render () {
    return (
        <table>
            {
              this.props.links.map((link, i) => {
                return (<LinkItem key={i} data={link}></LinkItem>)
              })
            }
        </table>
    )
  }
}

export default connect(mapStateToProps)(LinkList);