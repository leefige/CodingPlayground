import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      success: false,
    };
  }

  async handleSignup() {
    post('/api/v1/user/signup', {
      id: this.state.email,
      password: this.state.password,
    })
      .then((responseJson) => {
        if (responseJson.signup_success) {
          alert("注册成功，请登陆！");
          this.setState({
            success: true,
          });
        }
        else {
          alert("注册失败！");
        }
      })
      .catch((error) => {
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

  render() {
    if (!this.state.success) {
      return (
        <div className='col-md-4 col-md-offset-4'>
          <div className="form-box">
            <div className="form-top">
              <div className="form-top-left">
                <h3>欢迎来到CodingPlayground！</h3>
                <h4>赶快注册吧：</h4>
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
                <button type="button" className="btn btn-success form-btn" onClick={this.handleSignup.bind(this)}>注册！</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else {
      return(<Redirect push to="/login"/>);
    }
  }
}

export default Signup;
