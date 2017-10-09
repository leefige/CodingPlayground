// app/controller/user.js
module.exports = app => {
    class UserController extends app.Controller {
        async signup() {
            const body = this.ctx.request.body;
            const result = await this.ctx.service.user.signup(body);
            this.ctx.body = {
                judge: result,
            };
      }
      
        async login(){
            const result = await this.ctx.service.user.login();
            this.ctx.body = {
                judge: result,
            };
        }
    }
    return UserController;
};


