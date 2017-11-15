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

  describe('changePassword test', () => {
    it('should changePassword', () => {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changePassword({
          id: 'byn',
          old_password: '23',
          password: '233',
        });
        assert(flag === true);
    });

    it('should get error when id not correct', () => {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changePassword({
          userid: 'error',
          old_password: '23',
          password: '233',
        });
        assert(flag === false);
    });
  });

  describe('changeEmail test', () => {
    it('should changeEmail', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/user/changeEmail')
        .type('json')
        .send({
          id: 'byn',
          email: '2333333@163.com',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          changeEmail_success: false,
        });
    });

    it('should get error when data struction not correct', () => {
      return app.httpRequest()
      .post('/user/changePassword')
      .type('json')
      .send({
        autoLogin: 'error',
      })
      .expect(200)
      .expect({
        changeEmail_success: false,
      });
    });
  });

  describe('changeMobile test', () => {
    it('should changeMobile', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/user/changeMobile')
        .type('json')
        .send({
          id: 'byn',
          mobile: '23',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          changeMobile_success: false,
        });
    });

    it('should get error when data struction not correct', () => {
      return app.httpRequest()
      .post('/user/changePassword')
      .type('json')
      .send({
        autoLogin: 'error',
      })
      .expect(200)
      .expect({
        changeMobile_success: false,
      });
    });
  });

});
