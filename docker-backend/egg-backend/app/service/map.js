'use strict';
var fs = require('fs');

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        const result = await app.mysql.get('newmap', { userid: body.userid, mapid: body.mapid});
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

    async insertId(_body){
      try {
        const sql = "create table if not exists newmap(" +
        "userid VARCHAR(100)," +
        "mapid VARCHAR(100," +
        "data TEXT," +
        "primary key (userid)" +
        ");";
        /*const co = require('co');
        app.mysql.query = co.wrap(app.mysql.query);
        const query = co.wrap(app.mysql.query).bind(app.mysql);
        */
        await app.mysql.query(sql);
        /*
        app.mysql.insert = co.wrap(app.mysql.insert);
        const insert = co.wrap(app.mysql.insert).bind(app.mysql);

        app.mysql.update = co.wrap(app.mysql.update);
        const update = co.wrap(app.mysql.update).bind(app.mysql);
        */
        const blockly = fs.readFileSync('app/public/test.xml').toString();
        const mapid = fs.readFileSync('app/public/id.txt');
        for(var i=1; i<=10; i++){
          const result = fs.readFileSync('app/public/map' + i.toString() + '.json');
          var _data = JSON.parse(result);
          _data.blocklyConfig.toolboxCategories = blockly;
          const data = JSON.stringify(_data);
          const readid = mapid + i;
          const is_insert1 = await app.mysql.get('newmap', { userid: _body.id, mapid: readid });
          if(is_insert1 === null)
            await app.mysql.insert('newmap', { userid: _body.id, mapid: readid, data: data });
          else
            await app.mysql.update('newmap', { userid: _body.id, mapid: readid, data: data });
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async updateBlockly(body){
      try {
        const result = await app.mysql.get('newmap', { userid: body.userid, mapid: body.mapid});
        var map = JSON.parse(result.data);
        map.blocklyConfig = body.blockly;
        const data = JSON.stringify(map);
        const result = await app.mysql.update('newmap', {userid: body.id, mapid: body.mapid, data: data});
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

