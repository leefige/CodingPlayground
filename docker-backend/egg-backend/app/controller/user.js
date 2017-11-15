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
      await this.ctx.service.map.insertId(body);
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

      const result = await this.ctx.service.user.changePassword(body);
      this.ctx.body = {
        changePassword_success: result,
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

      const result = await this.ctx.service.user.changePassword(body);
      this.ctx.body = {
        changePassword_success: result,
      };
    }

  }
  return UserController;
};

