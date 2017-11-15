'use strict';
module.exports = app => {
  class UserService extends app.Service {
    async signup(_body) {
      const sql = "create table if not exists newuser(" +
        "id VARCHAR(100)," +
        "password VARCHAR(100)," +
        "email VARCHAR(100)," +
        "mobile VARCHAR(100)," +
        "image TEXT," +
        "primary key (id)" +
        ");";
      await app.mysql.query(sql);
      try {
        const is_insert = await app.mysql.get('newuser', { id: _body.id });
        if (is_insert === null) {
          const result = await app.mysql.insert('newuser', { id: _body.id, password: _body.password });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
        return false;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async login(_body) {
      const sql = "create table if not exists newuser(" +
      "id VARCHAR(100)," +
      "password VARCHAR(100)," +
      "email VARCHAR(100)," +
      "mobile VARCHAR(100)," +
      "image TEXT," +
      "primary key (id)" +
      ");";
    await app.mysql.query(sql);
      try {
        const result = await app.mysql.get('newuser', { id: _body.id, password: _body.password });
        if (result == null) {
          return false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }


    async changePassword(_body){
      try {
        const is_insert = await app.mysql.get('newuser', { id: _body.id, password: _body.old_password });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newuser', { id: _body.id, password: _body.password });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async changeEmail(_body){
      try {
        const is_insert = await app.mysql.get('newuser', { id: _body.id });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newuser', { id: _body.id, email: _body.email });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async changeMobile(_body){
      try {
        const is_insert = await app.mysql.get('newuser', { id: _body.id });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newuser', { id: _body.id, mobile: _body.mobile });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return UserService;
};
