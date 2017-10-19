// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/user.test.js', () => {
  afterEach(mock.restore);
  describe('logout test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/user/logout')
      .expect(200)
      .expect({
        logout_success: true,
      });
    });
  });

  describe('signup test', () => {
    it('should status 200 and get the body', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/user/signup')
        .type('json')
        .send({
          id: 'byn',
          password: '23',
        })
        .expect(200)
        .expect({
          signup_success: false,
        });
    });

    it('should get false when user exists', () => {
      return app.httpRequest()
      .post('/user/signup')
      .type('json')
      .send({
        id: '2341',
        password: '213',
      })
      .expect(200)
      .expect({
        signup_success: false,
      });
    });

    it('should get error when data not correct', () =>{
      return app.httpRequest()
      .post('/user/signup')
      .type('json')
      .send('error')
      .expect(400);
    })

     it('should send multi requests', async function () {
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
          signup_success: false,
      }); // 期望 body 是 hello world
      // 再请求一次
      const result = await app.httpRequest()
        .post('/user/signup')
        .type('json')
        .send({
          id: '234a1',
          password: '213',
        })
        .expect(200)
        .expect({
          signup_success: false,
      });
      // 也可以这样验证
      assert(result.status === 200);
      assert(result.body);
    });
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
        .expect({login_success: true,});
    });

    it('should get false when user not exists', async function() {
      return app.httpRequest()
      .post('/user/login')
      .type('json')
      .send({
        id: '23jlkll4a1',
        password: '213',
      })
      .expect(200) // 期望返回 status 200
      .expect({login_success: false,});
    });

    it('should get error when data not correct', () =>{
      return app.httpRequest()
      .post('/user/login')
      .type('json')
      .send('error')
      .expect(400);
    })

     it('should send multi requests', async function () {
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
      await app.httpRequest()
        .post('/user/login')
        .type('json')
        .send({
          id: '234c1',
          password: '213',
        })
        .expect(200)
        .expect({
          login_success: false,
      });
    });
  });

});
