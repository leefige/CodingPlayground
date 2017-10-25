'use strict';
const querystring = require("querystring");
module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        /*const result = await app.mysql.get('user', { id: body.id});
        const map = querystring.parse(result.data);
        return {
          mapInitState: map.state,
          mapResource: map.resource,
          blocklyConfig: map.block,
        };*/
        return {
          mapInitState: 1,
          mapResource: 2,
          blocklyConfig: 3,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        /* const sql = "create table if not exists map(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
      await app.mysql.query(sql);*/

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
  return MapService;
};

