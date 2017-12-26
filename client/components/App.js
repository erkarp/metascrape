var socket = io();
import React, { Component } from 'react'

class UrlForm extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A url was submitted: ' + this.state.value);
    socket.emit('submit', {url: this.state.value});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} /> 
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


const App = () => {
  return (
    <div>
      <UrlForm></UrlForm>
    </div>
    )
}

export default App 