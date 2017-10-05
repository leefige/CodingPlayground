import React, { Component } from 'react'

class LogoutHeader extends Component {
	static defaultProps = {
    username: '卡尔'
  }
	handleLogout() {
		this.props.onLogout()
	}
  render() {
    return (
      <div>
        {'欢迎，' + this.props.username}
        <button className="button" onClick = {this.handleLogout.bind(this)}>
          登出
        </button>
      </div>
    )
  }
}

class SignupHeader extends Component {
	handleLogin() {
		this.props.onLogin()
	}
	handleSignup() {
		this.props.onSignup()
	}
  render() {
  	return (
      <div>
        <button className="button" onClick = {this.handleLogin.bind(this)}>
          登录
        </button>
        <button className="button" onClick = {this.handleSignup.bind(this)}>
          注册
        </button>
      	</div>
    )
  }
}

class LoginHeader extends Component {
	render() {
		return (
			<div className='login-header'>
				{this.props.state ?
					<LogoutHeader
						username={this.props.username}
						onLogout={this.props.onLogout}/> :
					<SignupHeader
						onLogin={this.props.onLogin}
						onSignup={this.props.onSignup}/>}
						LoginHeader
			</div>
		)
	}
}
export default LoginHeader

