//'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/user.test.js', () => {
  afterEach(mock.restore);
  describe('signup()', () => {
    // 因为需要异步调用，所以使用 generator function
    it('should signup user', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const user = await ctx.service.user.signup({
          id: 'azxsd',
          password: 'cxv',
      });
      assert(user === false);
    });
    it('should get false when user exists', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.user.signup({
        id: 'fengmk1',
        password: '123',
      });
      assert(user === false);
    });
    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const user = await ctx.service.user.signup('error');
      assert(!user);
    });

  });

  describe('login()', () => {
    // 因为需要异步调用，所以使用 generator function
    it('should login user', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const user = await ctx.service.user.login({
          id: 'azxsd',
          password: 'cxv',
      });
      assert(user === true);
    });
    it('should get false when id or password error', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.user.login({
        id: 'fengmk1',
        password: '12',
      });
      assert(user === false);
    });
    it('should get 400 when data error', async function(){
      const ctx = app.mockContext();
      const user = await ctx.service.user.login('error');
      assert(!user);
    });
  });
});
