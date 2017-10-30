'use strict';
var fs = require('fs');

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        const result = await app.mysql.get('map', { id: body.id});
        const map = JSON.parse(result.data);
        return {
          mapInitState: map.mapInitState,
          mapResource: map.mapResource,
          blocklyConfig: map.blocklyConfig,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        /*const sql = "create table if not exists map(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
        await app.mysql.query(sql);*/
        const _data1 = {};
        const data1 = JSON.stringify(_data1);
        const is_insert1 = await app.mysql.get('map', { id: 250 });
        if(is_insert1 === null)
          await app.mysql.insert('map', { id: 260, data: data1 });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};

