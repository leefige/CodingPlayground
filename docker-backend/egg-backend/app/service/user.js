'use strict';
module.exports = app => {
  class UserService extends app.Service {
    async signup(_body) {
      /*const sql = "create table if not exists user(" +
        "id VARCHAR(100)," +
        "password VARCHAR(100)," +
        "primary key (id)" +
        ");";
      await app.mysqlquery(sql);*/
      try{
        const is_insert = await app.mysql.get('user', { id: _body.id });
        if (is_insert === null) {
          const result = await app.mysql.insert('user', { id: _body.id, password: _body.password });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
        else {
          return false;
        }
      } catch(err){
        console.log(err);
        return false;
      }
    }

    async login(_body) {
      try{
        const result = await app.mysql.get('user', { id: _body.id, password: _body.password });
        if (result == null)
          return false;
        else
          return true;
      } catch(err){
        console.log(err);
        return false;
      }     
    }
  }
  return UserService;
};
