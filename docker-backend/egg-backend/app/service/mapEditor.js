'use strict';
const uuid = require('uuid/v1');
module.exports = app => {
  class MapEditorService extends app.Service {
    async getAll() {
      try {
        const result = await app.mysql.select('mapeditor');
        return result;
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    async insertId(body){
      try {
        const sql = "create table if not exists mapeditor(" +
        "url VARCHAR(100)," +
        "name VARCHAR(100)," +
        "editor VARCHAR(100)," +
        "time VARCHAR(100)," +
        "primary key (url)" +
        ");";
        await app.mysql.query(sql);
        const key = uuidv1();
        const result = await app.mysql.get('mapeditor', { url: key});
        if(result === null)
          await app.mysql.insert('mapeditor', { url: key, name: body.name, editor: body.editor, time: body.time});
        else
          await app.mysql.update('mapeditor', { url: key, name: body.name, editor: body.editor, time: body.time});
        await this.ctx.service.map.insertId({
          id: key,
          map: body.map,
        });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

  }
  return MapEditorService;
};

