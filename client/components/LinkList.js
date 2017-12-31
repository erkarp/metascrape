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
          <thead>
            <tr><th>Slug</th></tr>
          </thead>

          <tbody>
            {this.props.links.map((link, i) => {
                return (<LinkItem key={i} url={link}></LinkItem>)
              }
            )}
          </tbody>
        </table>
    )
  }
}

export default connect(mapStateToProps)(LinkList);