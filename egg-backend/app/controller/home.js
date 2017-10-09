// app/controller/home.js
module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
        this.ctx.body = {
            name: 'egg',
            category: 'framework',
            language: 'Node.js',
        };
    }   
  }
  return HomeController;
};