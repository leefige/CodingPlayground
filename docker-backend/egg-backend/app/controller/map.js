// app/controller/map.js
'use strict';
module.exports = app => {
  class MapController extends app.Controller {
    async getId(){
      const body = this.ctx.request.body;
      const result = await this.ctx.service.map.getId(body);
      this.ctx.body = result;
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
