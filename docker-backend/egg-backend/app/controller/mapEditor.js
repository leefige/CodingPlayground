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
      const result = await this.ctx.service.mapEditor.insertId(this.ctx.request.body);
      this.ctx.body = {
        insertMap_sucess: result,
      };
    }
  }
  return MapEditor;
};
