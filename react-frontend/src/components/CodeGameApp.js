import CodeGameContent from '../pages/Gaming/CodeGameContent'
import MapEditor from '../pages/MapEditor/MapEditor'
import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Signup from './Signup'
import Login from './Login'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
        <div className="container">
          <div className='game-header row'>
            <div className='pull-right'>
              <Header
                state={this.state.isLogin}
                id={this.state.id}
                onLogin={this.handleLogin.bind(this)}
                onLogout={this.handleLogout.bind(this)} />
            </div>
          </div>
          <Route path="/map/:mapID/:recordID?" component={CodeGameContent} />
          <Route path="/mapEditor" component={MapEditor} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Footer className='footer-style' />
        </div>
      </div>
    )
  }
}

export default CodeGameApp
