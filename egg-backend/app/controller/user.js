// app/controller/user.js
module.exports = app => {
    class UserController extends app.Controller {
        async signup() {         
            let body = this.ctx.request.body;
            const result = await this.ctx.service.user.signup(body);
            this.ctx.body = {
                signup_success: result,
            };
            
      }
      
        async login(){
            let body = this.ctx.request.body;       
            const result = await this.ctx.service.user.login(body);
            this.ctx.body = {
                signup_success: result,
            };
        }
    }
    return UserController;
};


