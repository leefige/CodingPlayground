'use strict';
var fs = require('fs');

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        var result = awaitapp.mysql.get('newsmap', { id: body.userId+body.id});
        if(result === null){
          console.log('nop');
          resutl = await app.mysql.get('newsmap', { id: body.id});
        }
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

    async insertInit(){
      try {
        const sql = "create table if not exists newsmap(" +
        "id VARCHAR(100)," +
        "data TEXT," +
        "primary key (id)" +
        ");";
        const co = require('co');
        app.mysql.query = co.wrap(app.mysql.query);
        const query = co.wrap(app.mysql.query).bind(app.mysql);

        await query(sql);

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
          const is_insert1 = await app.mysql.get('newsmap', { id: readid});
          if(is_insert1 === null)
            await insert('newsmap', { id: readid, data: data });
          else
            await update('newsmap', { id: readid, data: data });
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async insertId(body){
      try {
        const result = await app.mysql.get('newmap', { id: body.key});
        if(result === null)
          await app.mysql.insert('newmap', { id: body.key, data: body.data})
        else
          await app.mysql.update('newmap', { id: body.key, data: body.data});
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async updateBlockly(body){
      try {
        var result = await app.mysql.get('newmap', { id: body.userId+body.id});
        if(result === null){
          result = await app.mysql.get('newmap', { id: body.id});
          await app.mysql.insert("newmap", { id: body.userId+body.id});
        }
        var map = JSON.parse(result.data);
        map.savedSolution = body.savedSolution;
        const data = JSON.stringify(map);
        const ans = await app.mysql.update('newmap', {id: body.userId+body.id, data: data});
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};

