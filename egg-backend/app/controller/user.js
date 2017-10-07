// app/controller/user.js
module.exports = app => {
    class UserController extends app.Controller {
        async signup() {
            const result = this.ctx.service.user.signup();
            /*this.ctx.body = result;/*{
                    name: 'egg',
                    category: 'framework',
                    language: 'Node.js',
                };*/
           
      }
      
        async login(){
            const result = this.ctx.service.user.login();
            this.ctx.body = `body: ${this.ctx.request.body}`;
            }
        }
    return UserController;
};


