import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import CodeGameContent from './CodeGameContent'
import MapEditor from './MapEditor'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Footer from './Footer'

class CodeGameApp extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false,
      id: '卡尔',
    }
  }

  handleLogin(id) {
    this.setState({
      isLogin: true,
      id: id
    })
  }

  handleLogout() {
    this.setState({
      isLogin: false
    })
  }
  
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className='row'>
            <div className='pull-right'>
              <LoginHeader
                state={this.state.isLogin}
                id={this.state.id}
                onLogin={this.handleLogin.bind(this)}
                onLogout={this.handleLogout.bind(this)} />
            </div>
          </div>
          <Route path="/map/:mapID/:recordID?" component={CodeGameContent} />
          <Route path="/mapEditor" component={MapEditor} />
          <Footer />
        </div>
      </div>
    )
  }
}

export default CodeGameApp
