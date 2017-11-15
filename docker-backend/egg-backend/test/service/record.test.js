'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/record.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    it('should get record id', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.record.getId({
          id: 'azxsd',
          userId: '12',
      });
      assert(record === null);
    });
    it('should get null when record not exists', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.record.getId({
        id: 'fengmk1',
        userId: 'qwe',
      });
      assert(record === null);
    });
    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const record = await ctx.service.record.getId('error');
      assert(!record);
    });

  });

  describe('insertId()', () => {
    it('should insert record id', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.record.insertId({
        id: '233',
        userId: '1231',
        data: '2',
      });
      assert(record !== null);
    });
  });

});
