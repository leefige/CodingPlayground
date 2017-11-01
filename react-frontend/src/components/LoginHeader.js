import React, { Component } from 'react'
import { post } from "../utils/Request"
require('es6-promise').polyfill();
require('isomorphic-fetch');

class LogoutHeader extends Component {
  handleLogout() {
    post('/user/logout', {})
      .then((responseJson) => {
        if (responseJson.logout_success) {
          this.props.onLogout();
        }
        else
          alert("登录失败！");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        {'欢迎，' + this.props.id}
        <button className="button" onClick={this.handleLogout.bind(this)}>
          登出
        </button>
      </div>
    )
  }
}

class SignupHeader extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    }

  }

  async handleLogin() {
    post('/user/login', {
      id: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.login_success) {
          this.props.onLogin(this.state.email);
        }
        else
          alert("登录失败！");
      }).catch((error) => {
        console.error(error);
      });
  }

  async handleSignup() {
    post('/user/signup', {
      id: this.state.email,
      password: this.state.password,
    })
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
  handleRememberMeChange(event) {
    this.setState({
      rememberMe: event.target.checked
    })
  }
  render() {
    return (
      <div className="clearfix">
        <button type="button" className="btn btn-success" style={{ marginRight: 15 }} data-toggle="modal" data-target="#loginModal">登录</button>
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
                    <input type="email" id="inputEmail" className="form-control" placeholder="邮箱" required autofocus value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                    <label for="inputPassword" className="sr-only">密码</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="密码" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" value={"remember-me"} checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)} /> 记住我
          						</label>
                    </div>
                    <button className="btn btn-lg btn-success btn-block" type="submit" data-dismiss="modal" onClick={this.handleLogin.bind(this)}>登录</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-success" style={{ marginRight: 15 }} data-toggle="modal" data-target="#signupModal">注册</button>
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
                    <input type="email" id="inputEmail" className="form-control" placeholder="邮箱" required autofocus value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                    <label for="inputPassword" className="sr-only">密码</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="密码" required value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
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
  handleLogout() {
    this.props.onLogout();
  }

  componentWillMount() {
    this.autoLogin();
  }

  async autoLogin() {
    post('/user/autoLogin', {
      autoLogin: true,
    })
      .then((responseJson) => {
        if (responseJson.autoLogin_success) {
          this.props.onLogin(responseJson.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.state ?
          <LogoutHeader
            id={this.props.id}
            onLogout={this.props.onLogout} /> :
          <SignupHeader
            onLogin={this.props.onLogin}
            onSignup={this.props.onSignup} />}
      </div>
    )
  }
}
export default LoginHeader
