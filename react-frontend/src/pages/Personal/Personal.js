import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { post } from "../../utils/Request"


class Personal extends Component {
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

  handleUploadAvatot() {
    document.getElementById("user_avatar").click();
  }

  handleReceiveAvator() {

  }

  getUserID() {
    return "user ID";
  }

  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className="tab-content">
          <form className="edit-user prepend-top-default" id="edit_user_6" enctype="multipart/form-data" action="/updateProfile" accept-charset="UTF-8" method="post">
            <div className="row">
              <div className="col-lg-3">
                <h4>我的头像</h4>
                <div className="clearfix avatar-image append-bottom-default">
                  <img alt="" className="avatar s160" src="http://47.94.142.165:8088/gitlab/uploads/user/avatar/6/avatar.png" />
                </div>
              </div>
              <div className="col-lg-9">
                <h5 className="prepend-top-0">更换头像</h5>
                <div className="prepend-top-5 append-bottom-10">
                  <div>
                  <button type="button" id="upload_avator"
                    className="btn btn-success blockly-btn"
                    onClick = {this.handleUploadAvatot.bind(this)}>
                    上传新头像
                  </button>
                  </div>
                  <input type="file" id="user_avatar" accept="image/*"
                    className="js-user-avatar-input hidden" 
                    name="user[avatar]"
                    onClick = {this.handleReceiveAvator.bind(this)}/>
                </div>
                <div className="help-block">图片最大尺寸为200KB</div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-lg-3 profile-settings-sidebar">
                <h4>账号设置</h4>
                <p>修改邮箱、修改密码、绑定手机</p>
              </div>
              <div className="col-lg-9">
                <div className="form-group">
                  <label className="label-light" for="user_name">用户名</label>
                  <span>user ID</span>
                </div>
                <div className="form-group">
                  <label className="label-light" for="user_email">绑定邮箱</label>
                  <input className="personal-control" required="required" type="text" value="xxx@email.com" name="user[email]" id="user_email" />
                </div>
                <div className="prepend-top-default append-bottom-default">
                <input type="submit" name="commit" value="Update profile settings" className="btn btn-success" />
                <a className="btn btn-cancel" href="/gitlab/u/2015010062">Cancel</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    );
  }
}

export default Personal;