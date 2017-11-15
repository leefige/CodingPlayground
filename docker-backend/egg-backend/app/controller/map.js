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
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          userId: { type: 'string' },
          savedSolution: {typr: 'string'},
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
