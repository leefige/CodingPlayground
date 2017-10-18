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
    }
  }
  return UserController;
};

