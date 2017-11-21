// app/controller/user.js
'use strict';
module.exports = app => {
  class UserController extends app.Controller {
    async signup() {
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          password: { type: 'string' },
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          signup_success: false,
        };
        return;
      }
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.signup(body);
      this.ctx.body = {
        signup_success: result,
      };
    }

    async login() {
      const body = this.ctx.request.body;
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          password: { type: 'string' },
          rememberMe: {type: 'boolean'},
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          login_success: false,
        };
        return;
      }

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
      try {
        await this.ctx.validate({
          autoLogin: {type: 'boolean'},
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          autoLogin_success: false,
        };
        return;
      }
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
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          old_password: { type: 'string'},
          password: { type: 'string' },
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          changePassword_success: false,
        };
        return;
      }

      const result = await this.ctx.service.user.changePassword(body);
      this.ctx.body = {
        changePassword_success: result,
      };
    }

    async changeEmail(){
      const body = this.ctx.request.body;
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          email: { type: 'string' },
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          changeEmail_success: false,
        };
        return;
      }

      const result = await this.ctx.service.user.changeEmail(body);
      this.ctx.body = {
        changeEmail_success: result,
      };
    }

    async changeMobile(){
      const body = this.ctx.request.body;
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          mobile: { type: 'string' },
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          changeMobile_success: false,
        };
        return;
      }

      const result = await this.ctx.service.user.changeMobile(body);
      this.ctx.body = {
        changeMobile_success: result,
      };
    }

    async verfifyMobile(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.verfifyMobile(body);
      this.ctx.body = {
        sendMobile_success: result,
      };
    }

    async verfifyEmail(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.user.verfifyEmail(body);
      this.ctx.body = {
        sendEMail_success: result,
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
      const body = this.ctx.request.body;
      const id = '0'; // ctx.params.id
      const fileUrl = await this.ctx.service.file.upload('users', id, stream, body);
      this.ctx.status = 200;
      this.ctx.body = {
        info: '上传头像成功',
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

