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
      <div className="pull-right">
        <button type="submit" className="btn btn-outline-primary" onClick = {this.handleLogin.bind(this)}>
          登录
        </button>
        <button type="submit" className="btn btn-outline-primary" onClick = {this.handleSignup.bind(this)}>
          注册
        </button>
      	</div>
    )
  }
}

class LoginHeader extends Component {
	render() {
		return (
			<div className='container'>
				<div className='text-right'>
				{this.props.state ?
					<LogoutHeader
						username={this.props.username}
						onLogout={this.props.onLogout}/> :
					<SignupHeader
						onLogin={this.props.onLogin}
						onSignup={this.props.onSignup}/>}
				</div>		
			</div>
		)
	}
}
export default LoginHeader

