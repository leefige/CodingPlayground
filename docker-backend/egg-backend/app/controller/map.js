// app/controller/map.js
'use strict';
module.exports = app => {
  class MapController extends app.Controller {
    async getId(){
      const body = this.ctx.request.body;
      console.log(body.userId);
      const result = await this.ctx.service.map.getId(this.ctx.request.body);
      this.ctx.body = result;
    }

    async insertId(){
      const result = await this.ctx.service.map.insertId();
      this.ctx.body = {
        id: result,
      };
    }

    async updateBlockly(){
      const result = await this.ctx.service.map.updateBlockly(this.ctx.request.body);
      this.ctx.body = {
        updateBlockly_sucess: result,
      }
    }
  }
  return MapController;
};
