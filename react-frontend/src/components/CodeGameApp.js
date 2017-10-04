import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import CodeGameContent from './CodeGameContent'
import Footer from './Footer' 

class CodeGameApp extends Component {
  constructor() {
    super()
    this.state = {
      isLogin:false,
      username:'卡尔',
    }
  }
  handleLogin() {
    console.log("login")
    this.setState({
      isLogin:true
    })
  }

  handleSignup() {

  }

  handleLogout() {
    this.setState({
      isLogin:false
    })
  }
  render() {    
    return (
      <div>
        <LoginHeader
          state = {this.state.isLogin}
          username = {this.state.username}
          onLogin = {this.handleLogin.bind(this)}
          onLogout = {this.handleLogout.bind(this)}
          onSignup = {this.handleSignup.bind(this)} />  
        <CodeGameContent />
        <Footer />
      </div>
    )
  }
}

export default CodeGameApp
