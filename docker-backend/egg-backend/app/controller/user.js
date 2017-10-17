// app/controller/user.js
'use strict';
module.exports = app => {
  class UserController extends app.Controller {
    async signup() {
      const body = this.ctx.request.body;
      try{
        const result = await this.ctx.service.user.signup(body);
        this.ctx.body = {
          signup_success: result,
        };
      } catch(err){
        console.log(err);
      }
    }

    async login() {
      const body = this.ctx.request.body;
      try{
        const result = await this.ctx.service.user.login(body);
        this.ctx.body = {
          login_success: result,
        };
      } catch(err){
        console.log(err);
      }
    }
  }
  return UserController;
};


