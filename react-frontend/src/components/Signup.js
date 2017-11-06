import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { post } from "../utils/Request"


class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    }

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

  render() {
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
              <button type="button" className="btn btn-success btn-form" onClick={this.handleSignup.bind(this)}>注册！</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup