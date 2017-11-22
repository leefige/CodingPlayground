import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      phone: '',
      password: '',
      validCode: '',
      answer: undefined,
      didValidCodeGet: false,
      timerCount: 60,
      validCodeCorrect: false,
      rememberMe: false,
      isMobileLogin: false,
    };
  }

  async handleLogin(event) {
    post('/api/v1/user/login', {
      id: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    })
      .then((responseJson) => {
        if (responseJson.login_success) {
          this.props.onLogin(this.state.email);
        }
        else {
          alert("登录失败！");
        }
      }).catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value
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

  handleValidCodeChange(event) {
    this.setState({
      validCode: event.target.value
    });
  }

  handleMobilePage() {
    this.setState({
      isMobileLogin: true,
    });
  }

  handleEmailPage() {
    this.setState({
      isMobileLogin: false,
    });
  }

  prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  }

  async handleGetValidCode() {
    const answer = this.prefixInteger(parseInt(Math.random() * 999999), 6);
    console.log(answer)
    document.getElementById("valid_btn").disabled = true;
    this.setState({
      didValidCodeGet: true,
      timerCount: 60,
      answer: answer,
    })
    this.intervel = setInterval(() => {
      if (!this.state.validCodeCorrect) {
        const count = this.state.timerCount - 1;
        if (count === -1) {
          document.getElementById("valid_btn").disabled = false;
          this.setState({
            didValidCodeGet: false,
            timerCount: 60,
          })
        }
        else {
          this.setState({
            timerCount: count,
          })
        }
      }
    }, 1000)
    console.log("mobile login");
    console.log(this.state.phone)
    console.log(answer)
    post("/api/v1/user/mobileLogin", {
      mobile: this.state.phone,
      code: answer,
    }).then((responseJson) => {
      console.log(responseJson)
      if (responseJson.mobileLogin_success) {
        alert("验证码成功发送至您的手机");
        this.setState({
          email: responseJson.userId,
        })
      }
      else {
        alert("获取验证码失败,请检查您的用户名是否正确后重试");
        document.getElementById("valid_btn").disabled = false;
        this.setState({
          didValidCodeGet: false,
          timerCount: 60,
          answer: undefined,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async handleMobileLogin(event) {
    if (this.state.validCode === this.state.answer) {
      this.setState({
        validCodeCorrect: true,
      })
      this.props.onLogin(this.state.email);
    }
    event.preventDefault();
  }
  render() {
    if (this.state.isMobileLogin) {
      return(
        <div className='col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
        <div className="form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>欢迎来到CodingPlayground！</h3>
              <h4>进入游戏前请登录：</h4>
            </div>
          </div>
          <div className="form-bottom">
            <form role="form" className="login-form" enctype="multipart/form-data" onSubmit={this.handleEmailPage.bind(this)} accept-charset="UTF-8" method="post">
              <div className="form-group">
                <label className="sr-only" htmlFor="form-phone">Phone Number</label>
                <input
                  type="text"
                  name="form-email"
                  placeholder="手机号"
                  className="form-phone form-control"
                  id="form-phone"
                  required
                  autoFocus
                  value={this.state.phone}
                  onChange={this.handlePhoneChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label className="sr-only" htmlFor="form-valid">Password</label>
                <input
                  type="text"
                  maxLength="6"
                  name="form-valid"
                  placeholder="验证码"
                  className="form-valid form-control" id="form-valid"
                  required
                  value={this.state.validCode}
                  onChange={this.handleValidCodeChange.bind(this)}
                />
              </div>
              <div className="form-group form-checkbox">
                <input type="checkbox" value={"remember-me"} checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)} /> 记住我
            </div>
              <div className="form-group">
                <span type="button" className="btn btn-default" onClick={this.handleGetValidCode.bind(this)}
                id="valid_btn">
                  {this.state.didValidCodeGet ? "获取验证码(" + this.state.timerCount + ")" : "获取验证码"}
                </span>
                <span type="button" className="btn btn-success" onClick={this.handleEmailPage.bind(this)}>邮箱登陆</span>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success form-btn">进入游戏！</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      );
    }
    else {
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
              <form role="form" className="login-form" enctype="multipart/form-data" onSubmit={this.handleLogin.bind(this)} accept-charset="UTF-8" method="post">
                <div className="form-group">
                  <label className="sr-only" htmlFor="form-email">Email</label>
                  <input
                    type="text"
                    name="form-email"
                    placeholder="邮箱"
                    className="form-email form-control"
                    id="form-email"
                    required
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="form-password">Password</label>
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
                <div className="form-group">
                  <Link to="/forgetPassword" type="button" className="btn btn-success">忘记密码？</Link>
                  <span type="button" className="btn btn-success" onClick={this.handleMobilePage.bind(this)}>手机登陆</span>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-success form-btn">进入游戏！</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
