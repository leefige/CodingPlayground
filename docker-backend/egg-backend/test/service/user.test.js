'use strict';
describe('signup()', () => {
    // 因为需要异步调用，所以使用 generator function
    it('should signup user', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const result = await ctx.service.user.signup({
          id: 'asd',
          password: 'cxv',
      });
      assert(user);
      assert(user.signup_success === true);
    });
    it('should get null when user not exists', function* () {
      const ctx = app.mockContext();
      const user = await ctx.service.user.get('fengmk1');
      assert(!user);
    });
  });