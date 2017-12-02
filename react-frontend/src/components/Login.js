import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
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
      id: this.state.userId,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    })
      .then((responseJson) => {
        if (responseJson.login_success) {
          this.props.onLogin(this.state.userId);
        }
        else {
          alert("登录失败！");
        }
      }).catch((error) => {
        // console.error(error);
      });
    event.preventDefault();
  }

  handleUserIdChange(event) {
    this.setState({
      userId: event.target.value
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

  handleUserIdPage() {
    this.setState({
      isMobileLogin: false,
    });
  }

  prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  }

  async handleGetValidCode() {
    const answer = this.prefixInteger(parseInt(Math.random() * 999999), 6);
    document.getElementById("valid_btn").disabled = true;
    console.log(document.getElementById("valid_btn"))
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
    post("/api/v1/user/mobileLogin", {
      mobile: this.state.phone,
      code: answer,
    }).then((responseJson) => {
      alert("验证码成功发送至您的手机");
      this.setState({
          userId: responseJson.userId,
        })
    }).catch((error) => {
      // console.error(error);
    });
  }

  async handleMobileLogin(event) {
    if (this.state.validCode === this.state.answer) {
      this.setState({
        validCodeCorrect: true,
      })
      this.props.onLogin(this.state.userId);
    }
    else {
      alert("验证码错误，请检查您的验证码是否输入正确。");
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
            <form role="form" className="login-form" enctype="multipart/form-data" onSubmit={this.handleMobileLogin.bind(this)} accept-charset="UTF-8" method="post">
              <div className="form-group">
                <label className="sr-only" htmlFor="form-phone">Phone Number</label>
                <input
                  type="text"
                  name="form-phone"
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
                <input className="white-font" type="checkbox" value={"remember-me"} checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)} /> 记住我
            </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success form-btn">进入游戏！</button>
              </div>
            </form>
            <div className="form-group">
                <div className="row">
                <button type="button" className="btn btn-default login-margin" onClick={this.handleGetValidCode.bind(this)}
                id="valid_btn">
                  {this.state.didValidCodeGet ? "获取验证码(" + this.state.timerCount + ")" : "获取验证码"}
                </button>
                <span type="button" className="btn btn-default login-margin" onClick={this.handleUserIdPage.bind(this)}>账号登录</span>
                </div>
            </div>
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
                  <label className="sr-only" htmlFor="form-userId">ID</label>
                  <input
                    type="text"
                    name="form-userId"
                    placeholder="账号"
                    className="form-userId form-control"
                    id="form-userId"
                    required
                    autoFocus
                    value={this.state.userId}
                    onChange={this.handleUserIdChange.bind(this)}
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
                <div className="form-group ">
                  <input type="checkbox" className="white-font" value={"remember-me"} checked={this.state.rememberMe} onChange={this.handleRememberMeChange.bind(this)} /> 记住我
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-success form-btn">进入游戏！</button>
                </div>
              </form>
              <div className="form-group">
                <div className="row">
                  <Link to="/forgetPassword" type="button" className="login-margin col-md-6 btn btn-default">忘记密码？</Link>
                  <span type="button" className="login-margin col-md-6 btn btn-default" onClick={this.handleMobilePage.bind(this)}>手机登录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
