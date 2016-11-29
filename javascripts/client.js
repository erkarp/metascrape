import React, { Component } from 'react'
import { render } from 'react-dom'


class UrlForm extends Component {

  render()
  {
    return (
      <form action="links" method="post">
        <input type="url" name="website"/>
        <input type="submit"/>
      </form>
    )
  }
}


class Page extends Component{

  // getInitialState: function()
  // {
  //   var links = this.props.links || [];
  //   return {};
  // },

  render()
  {
    return (
      <div>
        <UrlForm></UrlForm> 
      </div>
    )
  }
}


render(<Page/>, document.getElementById('main'))
// ReactDOM.render(<Page/>, document.getElementById('main'))
