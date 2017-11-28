//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/file.test.js', () => {
  afterEach(mock.restore);
  describe('upload()', () => {
    it('should get map id', async function () {
      const ctx = app.mockContext();
      const fileStream = fs.createReadStream('app/public/test.xml');
      const map = await ctx.service.file.upload('users', '0', fileStream, {
          id: '301',
      });
      assert(map === null);
    });

    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const map = await ctx.service.file.upload('error');
      assert(!map);
    });
  });
});
