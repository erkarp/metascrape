// var socket = io();
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import LinkList from './LinkList'

const App = () => {
  return (<LinkList props={this.props}></LinkList>)
}

export default App 