import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Redirect } from 'react-router-dom';
import { setInterval } from 'timers';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
    };
  }

  handleUserIdChange(event) {
    this.setState({
      userId: event.target.value
    });
  }

  handleSubmitFindPassword(event) {
    post('/api/v1/user/verfifyEmail', {
      id: this.state.userId,
    })
      .then((responseJson) => {
        if (responseJson.sendEmail_success) {
           alert("已将密码发送至邮箱！");
        }
        else {
          //alert("找回密码失败");
        }
      })
      .catch((error) => {
        // console.error(error);
      });
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
          <form className="edit-user prepend-top-default" encType="multipart/form-data" onSubmit={this.handleSubmitFindPassword.bind(this)} acceptCharset="UTF-8" method="post">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label-light" htmlFor="user_id">请输入用户名</label>
                  <input className="personal-control" required="required"
                    type="text" value={this.state.userId} onChange={this.handleUserIdChange.bind(this)}
                    name="user[id]" id="user_id" />
                </div>
                <div className="prepend-top-default append-bottom-default">
                  <button type="submit" className="btn btn-primary">找回密码</button>
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
