// app/controller/map.js
'use strict';
module.exports = app => {
  class RecordController extends app.Controller {
    async getId(){
      const result = await this.ctx.service.record.getId(this.ctx.request.body);
      this.ctx.body = result;
    }
    async insertId(){
      const result = await this.ctx.service.record.insertId(this.ctx.request.body);
      this.ctx.body = {
        id: result,
      };
    }
  }
  return RecordController;
};