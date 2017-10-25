//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/map.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    // 因为需要异步调用，所以使用 generator function
    it('should get map id', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.map
      const map = await ctx.service.map.getId({
          id: 'azxsd',
      });
      assert(map === {
        mapInitState: 1,
        mapResource: 2,
        blockConfig: 3,
      });
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

});
