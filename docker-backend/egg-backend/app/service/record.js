'use strict';
module.exports = app => {
  class RecordService extends app.Service {
    async getId(body) {
      try {
        /*const result = await app.mysql.get('user', { id: body.id });
        const record = querystring.parse(result.data);
        return {
          recordData: record.data,
        };*/
        return {
          recordData: 1,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        const data = querystring.stringify(body.data);
        const result = await app.mysql.insert('user', { id: body.id, data: data });
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

