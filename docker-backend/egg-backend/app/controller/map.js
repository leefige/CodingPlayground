// app/controller/map.js
'use strict';
module.exports = app => {
  class MapController extends app.Controller {
    async getId(){
      const result = await this.ctx.service.map.getId(this.ctx.request.body);
      this.ctx.body = result;
    }

    
  }
  return MapController;
};