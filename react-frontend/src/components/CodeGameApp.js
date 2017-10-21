import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import CodeGameContent from './CodeGameContent'
import Footer from './Footer' 

class CodeGameApp extends Component {
  constructor() {
    super()
    this.state = {
      isLogin:false,
      id:'卡尔',
    }
  }

  handleLogin(id) {
    this.setState({
      isLogin : true,
      id : id
    })
  }

  handleLogout() {
    this.setState({
      isLogin:false
    })
  }
  render() {    
    return (
      <div className="container">
        <LoginHeader
          state = {this.state.isLogin}
          id = {this.state.id}
          onLogin = {this.handleLogin.bind(this)}
          onLogout = {this.handleLogout.bind(this)}/>  
        <CodeGameContent />
        <Footer />
      </div>
    )
  }
}

export default CodeGameApp
