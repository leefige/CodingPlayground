'use strict';
const uuidv1 = require('uuid/v1');
module.exports = app => {
  class MapEditorService extends app.Service {
    async getAll() {
        const result = await app.mysql.select('mapeditor');
        return result;
    }

    async insertId(body){
        const sql = "create table if not exists mapeditor(" +
        "url VARCHAR(100)," +
        "name VARCHAR(100)," +
        "editor VARCHAR(100)," +
        "time VARCHAR(100)," +
        "primary key (url)" +
        ");";
        await app.mysql.query(sql);
        const key = 's' + uuidv1();
        await app.mysql.insert('mapeditor', { url: key, name: body.name, editor: body.editor, time: body.time});
        await this.ctx.service.map.insertId({
          id: key,
          map: body.map,
        });
        return true;
    }

  }
  return MapEditorService;
};

