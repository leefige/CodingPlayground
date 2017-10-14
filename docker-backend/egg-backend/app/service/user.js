
module.exports = app => {
    class UserService extends app.Service {
        async signup(_body) {
            const co = require('co');
            app.mysql.insert = co.wrap(app.mysql.insert);
            const insert = co.wrap(app.mysql.insert).bind(app.mysql);
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
            const is_insert = await get('user', {id: _body.id});
            if(is_insert == null){
                const result = await insert('user', {id: _body.id, password: _body.password});
                const insertSuccess = result.affectedRows === 1;
                return insertSuccess;
            }
            else{
                return false;
            }
        }

        async login(_body){
            const co = require('co');
            app.mysql.get = co.wrap(app.mysql.get);
            const get = co.wrap(app.mysql.get).bind(app.mysql);
            const body = this.ctx.request.body;
            const result = await get('user', {id: _body.id, password: _body.password});
            if(result == null)
                return false;
            else
                return true;
        }

    }
    return UserService;
  };
  