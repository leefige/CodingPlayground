import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { post } from "../../utils/Request";


class Account extends Component {
  constructor() {
    super();
    this.state = {
      id: 'user ID',
      email: '',
      oldPassword: '',
      newPassword: '',
      againPassword: '',
    };
  }

  async handleSubmitEmail(event) {
    alert("submit email");
    post('/user/change/email', {
      email: this.state.email,
    }).then((responseJson) => {
        if (responseJson.change_email_success)
          alert("修改成功！");
        else
          alert("修改失败！");
    }).catch((error) => {
      console.error(error);
    });
    event.preventDefault();
  }

  async handleSubmitPassword(event) {
    if (this.state.newPassword !== this.state.againPassword) {
      alert("两次输入的密码不同！");
    } else {
      alert("submit psw");
      post('/user/change/password', {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      }).then((responseJson) => {
          if (responseJson.change_email_success)
            alert("修改成功！");
          else
            alert("修改失败！");
      }).catch((error) => {
        console.error(error);
      });
    }
    event.preventDefault();
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleOldPasswordChange(event) {
    this.setState({
      oldPassword: event.target.value
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

  handleUploadAvatot() {
    document.getElementById("user_avatar").click();
  }

  handleReceiveAvator() {

  }

  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <div className="tab-content">
          <div class="tab-pane active" id="about">
            <h3>账户管理</h3>
            <h5>Account Management</h5>
          </div>
          <hr/>
          {/* <form className="edit-user prepend-top-default" id="edit_user_6" enctype="multipart/form-data" action="/updateProfile" accept-charset="UTF-8" method="post"> */}
            <div className="row">
              <div className="col-lg-3">
                <h4>我的头像</h4>
              </div>
              <div className="col-lg-4">
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
              <div className="col-lg-4 col-lg-offset-1">
                <div className="clearfix avatar-image append-bottom-default">
                  <img alt="" className="avatar s160" src="http://47.94.142.165:8088/gitlab/uploads/user/avatar/6/avatar.png" />
                </div>
              </div>
            </div>
          {/* </form> */}
          <hr/>
          <form className="edit-user prepend-top-default" id="edit_user_6" enctype="multipart/form-data" onSubmit={this.handleSubmitEmail.bind(this)} accept-charset="UTF-8" method="post">
            <div className="row">
              <div className="col-lg-3 profile-settings-sidebar">
                <h4>账号设置</h4>
              </div>
              <div className="col-lg-9">
                <div className="form-group">
                  <label className="label-light" for="user_name">用户名</label>
                  <input className="personal-control" type="text" 
                    value={this.state.id} readonly='readonly' name="user[id]" id="user_id" />
                </div>
                <div className="form-group">
                  <label className="label-light" for="user_email">绑定邮箱</label>
                  <input className="personal-control" required="required" 
                    type="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}
                    placeholder="sample@xyz.com" name="user[email]" id="user_email" />
                </div>
                <div className="prepend-top-default append-bottom-default">
                  <input type="submit" name="commit" value="确认提交"  className="btn btn-success" />
                  <a className="btn btn-cancel" href="/personal">取消修改</a>
                </div>
              </div>
            </div>
          </form>
          <hr/>
          <form className="edit-user prepend-top-default" id="edit_user_6" enctype="multipart/form-data" onSubmit={this.handleSubmitPassword.bind(this)} accept-charset="UTF-8" method="post">
            <div className="row">
              <div className="col-lg-3">
                <h4>修改密码</h4>
                <div className="clearfix avatar-image append-bottom-default">
                </div>
              </div>
              <div className="col-lg-9">
                <div className="form-group">
                  <span>旧密码</span>
                  <input className="personal-control" required="required" 
                    type="password" value={this.state.oldPassword} onChange={this.handleOldPasswordChange.bind(this)}
                    placeholder="请输入旧密码" name="user[old_password]" id="user_old_password" />
                  <p/>
                  <span>新密码</span>
                  <input className="personal-control" required="required" type="password" 
                    type="password" value={this.state.newPassword} onChange={this.handleNewPasswordChange.bind(this)}
                    placeholder="请输入新密码" name="user[new_password]" id="user_new_password" />
                  <p/>
                  <span>确认新密码</span>
                  <input className="personal-control" required="required" type="password" 
                    type="password" value={this.state.againPassword} onChange={this.handleAgainPasswordChange.bind(this)}
                    placeholder="请再次输入新密码" name="user[again_password]" id="user_again_password" />
                </div>
                <div className="prepend-top-default append-bottom-default">
                  <input type="submit" name="commit" value="确认提交" className="btn btn-success" />
                  <a className="btn btn-cancel" href="/personal">取消修改</a>
                </div>
              </div>
            </div>
            <hr/>
          </form>
        </div>
      </div>
      
    );
  }
}

export default Account;