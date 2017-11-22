// app/controller/map.js
'use strict';
module.exports = app => {
  class MapController extends app.Controller {
    async getId(){
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          userId: { type: 'string' },
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = false;
        return;
      }
      const body = this.ctx.request.body;
      const result = await this.ctx.service.map.getId(body);
      this.ctx.body = result;
    }

    async updateBlockly(){
      try {
        await this.ctx.validate({
          userid: { type: 'string' },
          mapid: { type: 'string' },
          blockly: {type: 'string'},
          curLevel: {type: 'string'},
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          updateBlockly_sucess: false,
        };
        return;
      }
      const result = await this.ctx.service.map.updateBlockly(this.ctx.request.body);
      this.ctx.body = {
        updateBlockly_sucess: result,
      }
    }
  }
  return MapController;
};
