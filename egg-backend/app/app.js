// app.js
module.exports = app => {
    app.beforeStart(function* () {
      const sql = "CREATE TABLE IF NOT EXISTS aaaa (" +
        "id VARCHAR(100), " +
        "password VARCHAR(100),"
        "primary key (id))";

      const a = yield app.mysql.query(sql);
      //yield app.model.sync({force: true});
    });
};