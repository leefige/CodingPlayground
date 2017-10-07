// app/controller/user.js
module.exports = app => {
    class UserController extends app.Controller {
        async signup() {
            //await app.mysql.insert();

            this.ctx.body = {
                name: 'egg',
                category: 'framework',
                language: 'Node.js',
            };
      }
      
        async login(){
            this.ctx.body = `user: ${this.ctx.params.id}, ${this.ctx.params.password}`;
        }
        }
    return UserController;
};


