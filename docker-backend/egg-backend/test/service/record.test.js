//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/record.test.js', () => {
  afterEach(mock.restore);
  describe('getId()', () => {
    // 因为需要异步调用，所以使用 generator function
    it('should get record id', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const user = await ctx.service.record.getId({
          id: 'azxsd',
      });
      assert(record === {
        recordData: 1,
      });
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

});
