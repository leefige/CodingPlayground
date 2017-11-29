'use strict';
var fs = require('fs');

module.exports = app => {
  class MapService extends app.Service {
    async getId(body){
      try {
        var result = await app.mysql.get('newsmap', { id: body.userId+body.id});
        if(result === null){
          result = await app.mysql.get('newsmap', { id: body.id});
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
        await app.mysql.query(sql);
        const blockly = fs.readFileSync('app/public/test.xml').toString();
        for(var i=1; i<=10; i++){
          const result = fs.readFileSync('app/public/map' + i.toString() + '.json');
          var _data = JSON.parse(result);
          _data.blocklyConfig.toolboxCategories = blockly;
          const data = JSON.stringify(_data);
          const readid = 300 + i;
          const is_insert1 = await app.mysql.get('newsmap', { id: readid});
          if(is_insert1 === null)
            await app.mysql.insert('newsmap', { id: readid, data: data });
          else
            await app.mysql.update('newsmap', { id: readid, data: data });
        }
      } catch (err) {
        console.error(err);
      }
    }

    async insertId(body){
      try {
        const result = await app.mysql.get('newsmap', { id: body.id});
        if(result === null)
          await app.mysql.insert('newsmap', { id: body.id, data: body.map})
        else
          await app.mysql.update('newsmap', { id: body.id, data: body.map});
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async updateBlockly(body){
      try {
        var result = await app.mysql.get('newsmap', { id: body.userid+body.mapid});
        if(result === null){
          result = await app.mysql.get('newsmap', { id: body.mapid});
          await app.mysql.insert("newsmap", { id: body.userid+body.mapid});
        }
        var map = JSON.parse(result.data);
        map.savedSolution = body.blockly;
        const user = await app.mysql.get('newsuser', { id: body.userid });
        if(parseInt(user.level, 10) === body.curLevel){
          await app.mysql.update('newsuser', {id: body.userid, level: body.curLevel+1});
        }
        const data = JSON.stringify(map);
        await app.mysql.update('newsmap', {id: body.userid+body.mapid, data: data});

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return MapService;
};

