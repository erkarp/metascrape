import React from 'react'
import LinkItem from './LinkItem.js'

const LinkList = (props) => {
  return (
      <table>
        <thead>
          <tr><th>Slug</th></tr>
        </thead>

        <tbody>
          {props.links.map((link, i) => {
              return (<LinkItem key={i} url={link.url}></LinkItem>)
            }
          )}
        </tbody>
      </table>)
}

export default LinkList;