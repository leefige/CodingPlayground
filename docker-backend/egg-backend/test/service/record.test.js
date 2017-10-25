//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/record.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    it('should get record id', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.record.getId({
          id: 'azxsd',
      });
      assert(record === null);
    });
    it('should get null when record not exists', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.record.getId({
        id: 'fengmk1',
      });
      assert(record === null);
    });
    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const record = await ctx.service.record.getId('error');
      assert(!record);
    });

  });

  describe('getId()', () => {
    it('should get record id', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.record.insertId();
      assert(record !== null);
    });
  });

});
