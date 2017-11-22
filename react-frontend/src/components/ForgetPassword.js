import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Redirect } from 'react-router-dom';
import { setInterval } from 'timers';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      newPassword: '',
      againPassword: '',
      answer: undefined,
      didValidCodeGet: false,
      timerCount: 60,
    };
  }

  async handleSubmitPassword(event) {
    if (this.state.newPassword !== this.state.againPassword) {
      alert("两次输入的密码不同！");
    } else {
      post('/api/v1/user/changePassword', {
        id: this.props.userId,
        old_password: this.state.oldPassword,
        password: this.state.newPassword,
      }).then((responseJson) => {
          if (responseJson.changePassword_success) {
            alert("修改成功，请重新登陆！");
            this.setState({
              shouldJump: true,
            });
          }
          else {
            alert("修改失败！");
          }
      }).catch((error) => {
        console.error(error);
      });
    }
    event.preventDefault();
  }

  handleUserIdChange(event) {
    this.setState({
      userId: event.target.value
    });
  }

  handleValidCodeChange(event) {
    this.setState({
      validCode: event.target.value
    });
  }

  handleNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value
    });
  }

  handleAgainPasswordChange(event) {
    this.setState({
      againPassword: event.target.value
    });
  }

  async handleGetValidCode() {
    const answer = parseInt(Math.random() * 999999);
    document.getElementById("valid_btn").disabled = true;
    this.setState({
      didValidCodeGet: true,
      timerCount: 60,
      answer: answer,
    })
    this.intervel = setInterval(() => {
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
    }, 1000)
    console.log(answer)
    post("/api/v1/user/verfifyEmail", {
      id: this.state.userId,
      code: answer,
    }).then((responseJson) => {
      if (responseJson.sendEmail_success) {
        alert("已将验证码发送至您的邮箱");
      }
      else {
        alert("获取验证码失败！");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    if (!this.state.shouldJump) {
      return (
        <div className='col-md-6 col-md-offset-3'>
          <div className="tab-content">
            <div className="tab-pane active" id="about">
              <h3>重置密码</h3>
              <h5>Reset Your Password</h5>
            </div>
            <hr/>
              <div className="row">
                <div className="col-lg-9">
                <div className="form-group">
                <label className="label-light" htmlFor="user_id">请输入您的用户名</label>
                <input className="personal-control" required="required"
                  type="text" value={this.state.userId} onChange={this.handleUserIdChange.bind(this)}
                  name="user[id]" id="user_id" />
              </div>
              <div className="form-group">
                    <label className="label-light" htmlFor="user_valid_code">请输入验证码</label>
                    <input className="personal-control" required="required"
                      type="text" value={this.state.validCode} onChange={this.handleValidCodeChange.bind(this)}
                      maxLength="6" name="user[validCode]" id="user_valid_code" />
                  </div>
                  <div className="prepend-top-default append-bottom-default">
                    <button type="button" className="btn btn-default" onClick={this.handleGetValidCode.bind(this)}
                    id="valid_btn">
                      {this.state.didValidCodeGet ? this.state.timerCount + "秒后重发" : "获取验证码"}
                    </button>
                    <button type="button" className="btn btn-primary">提交</button>
                  </div>
                </div>
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

export default ForgetPassword;
