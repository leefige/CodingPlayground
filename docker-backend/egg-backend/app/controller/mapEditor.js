// app/controller/map.js
'use strict';
module.exports = app => {
  class MapEditor extends app.Controller {
    async getAll(){
      const result = await this.ctx.service.mapEditor.getAll();
      this.ctx.body = {
        mapList: result,
    }
  }

    async insertId(){
      try {
        await this.ctx.validate({
          key: { type: 'string' },
          name: { type: 'string' },
          editor: { type: 'string'},
          time: { type: 'string'},
        });
      } catch (err) {
        console.error(err);
        return;
      }
      const result = await this.ctx.service.mapEditor.insertId(this.ctx.request.body);
    }
  }
  return MapEditor;
};