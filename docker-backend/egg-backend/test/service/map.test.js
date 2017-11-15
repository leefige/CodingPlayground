//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/map.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    it('should get map id', async function () {
      const ctx = app.mockContext();
      const map = await ctx.service.map.getId({
          id: '1233301',
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
      const map = await ctx.service.map.insertId({
        id: 'byn',
      });
      assert(map !== null);
    });
  });

  describe('updateBlockly', () => {
    it('should update blockly file', async function () {
      const ctx = app.mockContext();
      const map = await ctx.service.map.insertId({
        id: '1233301',
        savedSolution: '1',
      });
      assert(map !== null);
    })
  });
});
