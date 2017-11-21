'use strict';
module.exports = app => {
  class MapEditorService extends app.Service {
    async getAll(body) {
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
        "key VARCHAR(100)," +
        "name VARCHAR(100)," +
        "editor VARCHAR(100)," +
        "time VARCHAR(100)," +
        "primary key (id)" +
        ");";
        await app.mysql.query(sql);
        await app.mysql.insert('mapeditor', { key: body.key, name: body.name, editor: body.editor, time: body.time});
        const data = JSON.stringify(body.data);
        await app.mysql.insert('newsmap', { id: body.key, data: data});
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

  }
  return MapEditorService;
};

