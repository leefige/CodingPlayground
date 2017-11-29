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
          id: 'azxnbsd',
          password: 'cxnbv',
      });
      assert(user === true);
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
          rememberMe: false,
      });
      assert(user === true);
    });

    it('should login user and remember', async function () {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service.user
      const user = await ctx.service.user.login({
          password: 'cxv',
          rememberMe: true,
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
    it('should changePassword', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changePassword({
          id: 'byn',
          old_password: '213',
          password: '213',
        });
        assert(flag === true);
    });

    it('should get false', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changePassword({
          id: 'byn',
          old_password: '213',
        });
        assert(flag === false);
    });

    it('should get error when id not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changePassword('error');
      assert(flag === false);
    });
  });

  describe('changeEmail test', () => {
    it('should changeEmail', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeEmail({
          id: '233',
          email: '23',
        });
        assert(flag === false);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeEmail({
          id: false,
        });
        assert(flag === false);
    });
  });

  describe('changeMobile test', () => {
    it('should changeMobile', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeMobile({
          id: '233',
          mobile: '12321',
        });
        assert(flag === false);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeMobile({
          id: true,
        });
        assert(flag === false);
    });
  });


  describe('mobileLogin test', () => {
    it('should sendmessage', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.mobileLogin({
          mobile: '18993939177',
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.mobileLogin('error');
        assert(flag === false);
    });
  });

  describe('verfifyEmail test', () => {
    it('should sendmessage', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.verfifyEmail({
          id: 'byn',
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.verfifyEmail({
          mobile: true,
        });
        assert(flag === false);
    });
  });

  describe('changeVip test', () => {
    it('should get true', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeVip({
          id: 'g',
          vip: true,
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.changeVip({
        id: true,
      });
      assert(flag === false);
    });
  });

  describe('getVip test', () => {
    it('should get vip', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getVip({
          id: 'g',
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getVip({
          mobile: true,
        });
        assert(flag === false);
    });
  });

  describe('getLevel test', () => {
    it('should get level', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getLevel({
          id: 'g',
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getLevel({
          mobile: true,
        });
        assert(flag === false);
    });
  });

  describe('getPersonalAccount test', () => {
    it('should get personal Account', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getPersonalAccount({
          id: 'g',
        });
        assert(flag === true);
    });

    it('should get error when data struction not correct', async function() {
      const ctx = app.mockContext();
      const flag = await ctx.service.user.getPersonalAccount({
          mobile: true,
        });
        assert(flag === false);
    });
  });

});
