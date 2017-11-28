// app/controller/user.js
'use strict';
module.exports = app => {
  class UserController extends app.Controller {
    async signup() {
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.signup(body);
      this.ctx.body = {
        signup_success: result,
      };
    }

    async login() {
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.login(body);
      this.ctx.body = {
        login_success: result,
      };
      if(result === true){
        this.ctx.session.userId = body.id;
        this.ctx.session.userPassword = body.password;
        if(body.rememberMe === false){
          this.ctx.session.maxAge = 1000 * 1800;
        }
      }
    }

    async autoLogin() {
      const body = {
        id: this.ctx.session.userId,
        password: this.ctx.session.userPassword,
      }
      const result = await this.ctx.service.user.login(body);
      this.ctx.body = {
        autoLogin_success: result,
        id: body.id,
      };
    }

    async logout() {
        this.ctx.session.userId = null;
        this.ctx.session.userPassword = null;
        this.ctx.body = {
          logout_success: true,
        };
    }

    async changePassword(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.changePassword(body);
      this.ctx.body = {
        changePassword_success: result,
      };
    }

    async changeEmail(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.changeEmail(body);
      this.ctx.body = {
        changeEmail_success: result,
      };
    }

    async changeMobile(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.changeMobile(body);
      this.ctx.body = {
        changeMobile_success: result,
      };
    }

    async verfifyEmail(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.verfifyEmail(body);
      this.ctx.body = {
        sendEmail_success: result,
      };
    }


    async mobileLogin(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.mobileLogin(body);
      this.ctx.body = {
        mobileLogin_success: result.flag,
        userId: result.userId,
      };
    }

    async changeVip(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.changeVip(body);
      this.ctx.body = {
        changeVip_success: result,
      };
    }

    async getVip(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.getVip(body);
      this.ctx.body = {
        vip: result,
      };
    }

    async getLevel(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.getLevel(body);
      this.ctx.body = {
        level: result,
      };
    }

    async uploadAvatar () {
      const stream = await this.ctx.getFileStream();
      const body = stream.fields;
      const id = '0'; // ctx.params.id
      const fileUrl = await this.ctx.service.file.upload('users', id, stream, body);
      this.ctx.body = {
        img: fileUrl,
      };
    }

    async getPersonalAccount(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.getPersonalAccount(body);
      this.ctx.body = result;
    }

  }
  return UserController;
};

