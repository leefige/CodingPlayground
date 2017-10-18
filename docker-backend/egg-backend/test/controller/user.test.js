'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/user.test.js', () => {
  afterEach(mock.restore);
  describe('signup test', () => {
    it('should status 200 and get the body', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/user/signup')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200) // 期望返回 status 200
        .expect({
            signup_success: true,
        });
    });

    it('should get null when user not exists', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.user.signup({
        id: 'fengmk1',
        password: '123',
      });
      assert(user);
      assert(user.signup_success === false);
    });

    it('should mock fengmk1 exists', async function () {
      const ctx = app.mockContext();
      app.mockService('user', 'signup', async function () {
        return {
          signup_success: false,
        };
      });
      const user = await ctx.service.user.signup({
        id: 'fengmk1',
        password: '123',
      });
      assert(user);
      assert(user.signup_success === false);
    });

    /*it('should send multi requests', async function () {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .post('/user/signup')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          signup_success: true,
      }); // 期望 body 是 hello world
      // 再请求一次
      const result = awiat app.httpRequest()
        .get('/user/signup')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200)
        .expect({
          signup_success: true,
      });
      // 也可以这样验证
      assert(result.status === 200);
    });*/
  });

  describe('login test', () => {
    it('should status 200 and get the body', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/user/login')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200) // 期望返回 status 200
        .expect({
            login_success: true,
        });
    });

    it('should get null when user not exists', async function () {
      const ctx = app.mockContext();
      const user = await ctx.service.user.login({
        id: 'fengmk1',
        password: '123',
      });
      assert(user);
      assert(user.login_success === false);
    });

    it('should mock fengmk1 exists', async function () {
      const ctx = app.mockContext();
      app.mockService('user', 'login', async function () {
        return {
          signup_success: false,
        };
      });
      const user = await ctx.service.user.login({
        id: 'fengmk1',
        password: '123',
      });
      assert(user);
      assert(user.login_success === false);
    });

    /*it('should send multi requests', async function () {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .post('/user/login')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          login_success: true,
      }); // 期望 body 是 hello world
      // 再请求一次
      const result = awiat app.httpRequest()
        .get('/user/login')
        .type('json')
        .send({
          id: '2341',
          password: '213',
        })
        .expect(200)
        .expect({
          login_success: true,
      });
      // 也可以这样验证
      assert(result.status === 200);
    });*/
  });

});