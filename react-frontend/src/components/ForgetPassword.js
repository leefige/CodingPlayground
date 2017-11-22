import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Redirect } from 'react-router-dom';
import { setInterval } from 'timers';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      validCode: '',
      answer: undefined,
      didValidCodeGet: false,
      timerCount: 60,
      validCodeCorrect: false,
    };
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

  prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  }

  async handleGetValidCode() {
    const answer = this.prefixInteger(parseInt(Math.random() * 999999), 6);
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
    post("/api/v1/user/verfifyMobile", {
      id: this.state.userId,
      code: answer,
    }).then((responseJson) => {
      if (responseJson.sendMobile_success) {
        alert("验证码成功发送至您的手机");
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

  handleSubmitFindPassword(event) {
    if (this.state.validCode === this.state.answer) {
      this.setState({
        validCodeCorrect: true,
      })
      // TODO: post to backend to get password
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <div className="tab-content">
          <div className="tab-pane active" id="about">
            <h3>找回密码</h3>
            <h5>Find Your Password</h5>
          </div>
          <hr />
          <form className="edit-user prepend-top-default" enctype="multipart/form-data" onSubmit={this.handleSubmitFindPassword.bind(this)} accept-charset="UTF-8" method="post">
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
                    {this.state.didValidCodeGet ? "获取验证码(" + this.state.timerCount + ")" : "获取验证码"}
                  </button>
                  <button type="submit" className="btn btn-primary">提交</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
