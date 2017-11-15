// app/controller/map.js
'use strict';
module.exports = app => {
  class RecordController extends app.Controller {
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
      const result = await this.ctx.service.record.getId(this.ctx.request.body);
      this.ctx.body = result;
    }
    async insertId(){
      try {
        await this.ctx.validate({
          id: { type: 'string' },
          userId: { type: 'string' },
          data: {typr: 'string'},
        });
      } catch (err) {
        console.error(err);
        this.ctx.body = {
          id: false,
        };
        return;
      }
      const result = await this.ctx.service.record.insertId(this.ctx.request.body);
      this.ctx.body = {
        id: result,
      };
    }
  }
  return RecordController;
};
