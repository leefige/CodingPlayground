import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  async handleLogin() {
    // console.log("login")
    post('/user/login', {
      id: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    })
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson.login_success) {
          alert("登录成功！");
          this.props.onLogin(this.state.email);
        }
        else {
          alert("登录失败！");
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleRememberMeChange(event) {
    this.setState({
      rememberMe: event.target.checked
    });
  }

  render() {
    return (
      <div className='col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
        <div className="form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>欢迎来到CodingPlayground！</h3>
              <h4>进入游戏前请登录：</h4>
            </div>
          </div>
          <div className="form-bottom">
            <form role="form" className="login-form">
              <div className="form-group">
                <label className="sr-only" for="form-email">Email</label>
                <input
                  type="text"
                  name="form-email"
                  placeholder="邮箱"
                  className="form-email form-control"
                  id="form-email"
                  required
                  autofocus
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind(this)}
                  />
              </div>
              <div className="form-group">
                <label className="sr-only" for="form-password">Password</label>
                <input
                  type="password"
                  name="form-password"
                  placeholder="密码"
                  className="form-password form-control" id="form-password"
                  required
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  />
              </div>
              <div className="form-group form-checkbox">
                  <input type="checkbox" value={"remember-me"} checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)} /> 记住我
              </div>
              <button type="button" class="btn btn-success form-btn" onClick={this.handleLogin.bind(this)}>进入游戏！</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
