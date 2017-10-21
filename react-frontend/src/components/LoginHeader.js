import React, { Component } from 'react'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class LogoutHeader extends Component {
	handleLogout() { this.props.onLogout() }
	render() {
		return (
			<div>
				{'欢迎，' + this.props.username}
				<button className="button" onClick={this.handleLogout.bind(this)}>
					登出
        </button>
			</div>
		)
	}
}

class SignupHeader extends Component {
	constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
	}
	async handleLogin() {
		fetch('http://127.0.0.1:7001/user/login', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				id: this.state.email,
				password: this.state.password,
				autoLogin: false,
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			if (responseJson.login_success){
				this.props.onLogin(this.state.email);
				console.log("Login success!")
			}
				
			else
				alert("登录失败！");
		})
		.catch((error) => {
			console.error(error);
		});
	}

	async handleSignup() {
		fetch('http://127.0.0.1:7001/user/signup', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({
				id: this.state.email,
				password: this.state.password,
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if (responseJson.signup_success)
				alert("注册成功！");
			else
				alert("注册失败！");
		})
		.catch((error) => {
			console.error(error);
		});
	}

	handleEmailChange(event) {
		this.setState({
			email: event.target.value
		})
	}
	handlePasswordChange(event) {
		this.setState({	
			password: event.target.value
		})
	}
	render() {
		return (
			<div className="clearfix">
				<button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#loginModal">登录</button>
				<div className="modal fade clearfix text-left" id="loginModal" tabindex="-1" role="dialog">
					<div className="modal-dialog modal-sm" role="document">
						<div className="modal-content text-left">
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-md-10">
								<h4>请登录</h4>
								</div>
								<div className="col-md-1 col-md-offset-11">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										</div>
										</div>
									<form className="form-signin">
										<label for="inputEmail" className="sr-only">邮箱</label>
										<input type="email" id="inputEmail" className="form-control" placeholder="邮箱" required autofocus value = {this.state.email}  onChange={this.handleEmailChange.bind(this)}/>
										<label for="inputPassword" className="sr-only">密码</label>
										<input type="password" id="inputPassword" className="form-control" placeholder="密码" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
										<div className="checkbox">
											<label>
												<input type="checkbox" value="remember-me"/> 记住我
          						</label>
										</div>
										<button className="btn btn-lg btn-success btn-block" type="submit" data-dismiss="modal" onClick={this.handleLogin.bind(this)}>登录</button>
									</form>

								</div>
							</div>
						</div>
					</div>
				</div>

				<button type="button" className="btn btn-primary pull-right" data-toggle="modal" data-target="#signupModal">注册</button>
				<div className="modal fade clearfix text-left" id="signupModal" tabindex="-1" role="dialog">
					<div className="modal-dialog modal-sm" role="document">
						<div className="modal-content text-left">
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-md-10">
								<h4>请注册</h4>
								</div>
								<div className="col-md-1 col-md-offset-11">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										</div>
										</div>
									<form className="form-signin">
										<label for="inputEmail" className="sr-only">邮箱</label>
										<input type="email" id="inputEmail" className="form-control" placeholder="邮箱" required autofocus value = {this.state.email}  onChange={this.handleEmailChange.bind(this)}/>
										<label for="inputPassword" className="sr-only">密码</label>
										<input type="password" id="inputPassword" className="form-control" placeholder="密码" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
										<button className="btn btn-lg btn-success btn-block" type="submit" data-dismiss="modal" onClick={this.handleSignup.bind(this)}>注册</button>
									</form>

								</div>
							</div>
						</div>
					</div>
				</div>
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
							onLogout={this.props.onLogout} /> :
						<SignupHeader
							onLogin={this.props.onLogin}
							onSignup={this.props.onSignup} />}
				</div>
			</div>
		)
	}
}
export default LoginHeader

