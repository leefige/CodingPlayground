'use strict';
var fs = require('fs');

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        const result = await app.mysql.get('newmap', { userid: body.userId, mapid: body.id});
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

    async insertId(_body){
      try {
        const sql = "create table if not exists newmap(" +
        "userid VARCHAR(100)," +
        "mapid VARCHAR(100)," +
        "data TEXT," +
        "primary key (userid)" +
        ");";
        const co = require('co');
        app.mysql.query = co.wrap(app.mysql.query);
        const query = co.wrap(app.mysql.query).bind(app.mysql);

        await query(sql);
        console.log('query');

        app.mysql.insert = co.wrap(app.mysql.insert);
        const insert = co.wrap(app.mysql.insert).bind(app.mysql);

        app.mysql.update = co.wrap(app.mysql.update);
        const update = co.wrap(app.mysql.update).bind(app.mysql);

        const blockly = fs.readFileSync('app/public/test.xml').toString();

        for(var i=1; i<=10; i++){
          const result = fs.readFileSync('app/public/map' + i.toString() + '.json');
          var _data = JSON.parse(result);
          _data.blocklyConfig.toolboxCategories = blockly;
          const data = JSON.stringify(_data);
          const readid = 300 + i;
          const is_insert1 = await app.mysql.get('newmap', { userid: _body.id, mapid: readid });
          console.log('insert');
          if(is_insert1 === null)
            await insert('newmap', { userid: _body.id, mapid: readid, data: data });
          else
            await update('newmap', { userid: _body.id, mapid: readid, data: data });
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
        map.savedSolution = body.savedSolution;
        const data = JSON.stringify(map);
        const ans = await app.mysql.update('newmap', {userid: body.id, mapid: body.mapid, data: data});
        const insertSuccess = ans.affectedRows === 1;
        return insertSuccess;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};

