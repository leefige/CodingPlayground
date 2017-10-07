module.exports = app => {
    class UserService extends app.Service {
        * signup() {
            /*const co = require('co');
            app.mysql.query = co.wrap(app.mysql.query);
            // 如果想要直接用 query 方法，需要绑定 this 为 app.mysql
            const query = co.wrap(app.mysql.query).bind(app.mysql);
            // 包装之后即可在 async function 中使用
            async function getUser() {
              // return await app.mysql.query();
              return await query();
            }*/

            const body = this.ctx.request.body;
            this.ctx.body = {id: body.id, password: body.password};
            const result = yield this.app.mysql.insert('user', {id: body.id, password: body.password});
            // 判断插入成功
            const insertSuccess = result.affectedRows === 1;
            this.ctx.logger.info("insert", insertSuccess);
            return insertSuccess;
        }

        * login(){
            const body = this.ctx.request.body;
            const result = yield this.app.mysql.get('user', {id: body.id, password: body.password});
            return {
                result,
            }
        }

    }
    return UserService;
  };
  