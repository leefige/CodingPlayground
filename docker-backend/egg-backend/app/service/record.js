'use strict';
module.exports = app => {
  class RecordService extends app.Service {
    async getId(body) {
      try {
        const result = await app.mysql.get('record', { id: body.userId+body.id});
        const map = JSON.parse(result.data);
        return {
          mapInitState: map.mapInitState,
          mapResource: map.mapResource,
          blocklyConfig: map.blocklyConfig,
          savedSolution: map.savedSolution,
          stdBlockNum: map.stdBlockNum,
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
        const is_insert1 = await app.mysql.get('record', { id: body.userId+body.id});
        if(is_insert1 === null){
          const result = await app.mysql.insert('record', { id: body.userId+body.id, data: data });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
        else{
          const result = await app.mysql.update('record', { id: body.userId+body.id, data: data });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

  }
  return RecordService;
};

