'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/mapEditor.test.js', () => {
  afterEach(mock.restore);
  describe('getAll()', () => {
    it('should get all', async function () {
      const ctx = app.mockContext();
      const result = await ctx.service.mapEditor.getAll();
      assert(result !== null);
    });
  });

  describe('insertId()', () => {
    it('should insert map id', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.mapEditor.insertId({
        key: '233',
        body: '1231',
        editor: '2',
        time: 'aasd',
      });
      assert(record !== null);
    });

    it('should update map id', async function () {
      const ctx = app.mockContext();
      const record = await ctx.service.mapEditor.insertId({
        key: '233',
        body: '1231',
        editor: '2',
        time: 'aasd',
      });
      assert(record !== null);
    });
  });

});
