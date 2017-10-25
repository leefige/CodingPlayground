//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/map.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    it('should get map id', async function () {
      const ctx = app.mockContext();
      const map = await ctx.service.map.getId({
          id: 'azxsd',
      });
      assert(map === null);
    });
    it('should get null when map not exists', async function () {
      const ctx = app.mockContext();
      const map = await ctx.service.map.getId({
        id: 'fengmk1',
      });
      assert(map === null);
    });
    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const map = await ctx.service.map.getId('error');
      assert(!map);
    });

  });
  describe('insertId()', () => {
    it('should insert map status', async function () {
      const ctx = app.mockContext();
      const map = await ctx.service.map.insertId();
      assert(map !== null);
    });
  });

});
