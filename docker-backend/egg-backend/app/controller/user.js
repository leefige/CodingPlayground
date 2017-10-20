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
      // 获取 Session 上的内容
      const userId = this.ctx.session.userId;
      const userPassword = this.ctx.session.userPassword;
      const body = this.ctx.request.body;
      if(body.autoLogin === true){
        const result = await this.ctx.service.user.login({
          id: userId,
          password: userPassword,
        });
        this.ctx.body = {
          login_success: result,
          id: userId,
        };
      }
      else{
        const result = await this.ctx.service.user.login(body);
        this.ctx.body = {
          login_success: result,
          id: userId,
        };
        this.ctx.session.userId = body.id;
        this.ctx.session.userPassword = body.password;
      }
    }

    async logout() {
      try{
        this.ctx.session.userId = null;
        this.ctx.session.userPassword = null;
        this.ctx.body = {
          logout_success: true,
        };
      } catch(err){
        console.log(err);
        this.ctx.body = {
          logout_success: false,
        };
      }
    }
  }
  return UserController;
};

