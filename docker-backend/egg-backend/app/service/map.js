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
        const sql = "create table if not exists map(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
        await app.mysql.query(sql);
        const result = fs.readFileSync('app/public/test.json');
        var _data = JSON.parse(result);
        const blockly = fs.readFileSync('app/public/test.xml').toString();
        _data.blocklyConfig.toolboxCategories = blockly;
        const data = JSON.stringify(_data);
        const is_insert1 = await app.mysql.get('map', { id: 274 });
        if(is_insert1 === null)
          await app.mysql.insert('map', { id: 274, data: data });
        else
          await app.mysql.update('map', { id: 274, data: data });
        return _data.blocklyConfig;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};

