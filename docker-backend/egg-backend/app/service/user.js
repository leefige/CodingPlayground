
module.exports = app => {
    class UserService extends app.Service {
        async signup(_id, _password) {
            const co = require('co');
            app.mysql.insert = co.wrap(app.mysql.insert);
            // 如果想要直接用 query 方法，需要绑定 this 为 app.mysql
            const insert = co.wrap(app.mysql.insert).bind(app.mysql);
            // 包装之后即可在 async function 中使用
            app.mysql.get = co.wrap(app.mysql.get);
            const get = co.wrap(app.mysql.get).bind(app.mysql);
            app.mysql.query = co.wrap(app.mysql.query);
            const query = co.wrap(app.mysql.query).bind(app.mysql);
            const sql = "create table if not exists user(" +
            "id VARCHAR(100)," +
            "password VARCHAR(100)," +
            "primary key (id)" +
            ");";
    
            await query(sql);
            const is_insert = await get('user', {id: _id});
            if(is_insert == null){
                const result = await insert('user', {id: _id, password: _password});
                // 判断插入成功
                const insertSuccess = result.affectedRows === 1;
                return insertSuccess;
            }
            else{
                return false;
            }
        }

        async login(_id, _password){
            const co = require('co');
            app.mysql.get = co.wrap(app.mysql.get);
            const get = co.wrap(app.mysql.get).bind(app.mysql);
            const body = this.ctx.request.body;
            const result = await get('user', {id: _id, password: _password});
            if(result == null)
                return false;
            else
                return true;
        }

    }
    return UserService;
  };
  