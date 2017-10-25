'use strict';
module.exports = app => {
  class RecordService extends app.Service {
    async getId(body) {
      const sql = "create table if not exists record(" +
      "id VARCHAR(100)," +
      "data TEXT," +
      "primary key (id)" +
      ");";
      await app.mysql.query(sql);
      try {
        const result = await app.mysql.get('record', { id: body.id });
        const record = JSON.parse(result.data);
        return {
          recordData: record.data,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        const sql = "create table if not exists record(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
        await app.mysql.query(sql);

        const data = JSON.stringify(body.data);
        const result = await app.mysql.insert('record', { id: 675, data: '9' });
        const insertSuccess = result.affectedRows === 1;
        return insertSuccess;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

  }
  return RecordService;
};

