import React, { Component } from 'react'
import { render } from 'react-dom'


class UrlForm extends Component
{
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

class App extends Component
{
  constructor(props, context)
  {
    super(props, context)

    this.state = {
      testVar: 'testVALUE'
    }
  }

  update(data)
  {
    this.setState({
      testVar: 'Connected as of ' + data
    })
  }

  render()
  {
    return (
      <div>
        <UrlForm></UrlForm>
        <h2>{this.state.testVar}</h2>
      </div>
    )
  }
}


var app = render(<App/>, document.getElementById('main'));
// ReactDOM.render(<Page/>, document.getElementById('main'))

var socket = io();
socket.on('news', function (data)
{
  console.log(data);
  app.update(data.hello);
});
