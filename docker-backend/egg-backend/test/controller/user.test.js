// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/user.test.js', () => {
  afterEach(mock.restore);
  describe('logout test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/api/v1/user/logout')
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
        .post('/api/v1/user/signup')
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
      .post('/api/v1/user/signup')
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
      .post('/api/v1/user/signup')
      .type('json')
      .send('error')
      .expect(400);
    })

     it('should send multi requests', async function () {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .post('/api/v1/user/signup')
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
        .post('/api/v1/user/signup')
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
        .post('/api/v1/user/login')
        .type('json')
        .send({
          id: '2341',
          password: '213',
          rememberMe: false,
        })
        .expect(200) // 期望返回 status 200
        .expect({
          login_success: true,
        });
    });

    it('should get false when user not exists', async function() {
      return app.httpRequest()
      .post('/api/v1/user/login')
      .type('json')
      .send({
        id: '23jlkll4a1',
        password: '213',
        rememberMe: false,
      })
      .expect(200) // 期望返回 status 200
      .expect({
        login_success: false,
      });
    });

    it('should get error when data not correct', () =>{
      return app.httpRequest()
      .post('/api/v1/user/login')
      .type('json')
      .send('error')
      .expect(400);
    })

    it('should get error when data struction not correct', () => {
      return app.httpRequest()
      .post('/api/v1/user/login')
      .type('json')
      .send({
        id: true,
        password: '213',
      })
      .expect(200)
      .expect({
        login_success: false,
      });
    });


     it('should send multi requests', async function () {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .post('/api/v1/user/login')
        .type('json')
        .send({
          id: '233',
          password: '233',
          rememberMe: true,
        })
        .expect(200) // 期望返回 status 200
        .expect({
          login_success: true,
      }); // 期望 body 是 hello world
      // 再请求一次
      await app.httpRequest()
        .post('/api/v1/user/login')
        .type('json')
        .send({
          id: '233',
          password: '2',
          rememberMe: false,
        })
        .expect(200)
        .expect({
          login_success: false,
      });
    });
  });

  describe('autoLogin test', () => {
    it('should autoLogin', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/api/v1/user/autoLogin')
        .type('json')
        .send({
          autoLogin: true,
        })
        .expect(200) // 期望返回 status 200
        .expect({
          autoLogin_success: false,
        });
    });

    it('should get error when data struction not correct', () => {
      return app.httpRequest()
      .post('/api/v1/user/autoLogin')
      .type('json')
      .send({
        autoLogin: 'error',
      })
      .expect(200)
      .expect({
        autoLogin_success: false,
      });
    });

  });

  describe('changePassword test', () => {
    it('should changePassword', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/api/v1/user/changePassword')
        .type('json')
        .send({
          id: '2341',
          old_password: '213',
          password: '213',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          changePassword_success: false,
        });
    });
  });

  describe('changeEmail test', () => {
    it('should changeEmail', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/api/v1/user/changeEmail')
        .type('json')
        .send({
          id: 'g',
          email: 'maoym15@mails.tsinghua.edu.cn',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          changeEmail_success: false,
        });
    });
  });

  describe('changeMobile test', () => {
    it('should changeMobile', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/api/v1/user/changeMobile')
        .type('json')
        .send({
          id: 'g',
          mobile: '18693939177',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          changeMobile_success: true,
        });
    });
  });

  describe('verfifyEmail test', () => {
    it('should verfifyEmail', () => {
      // 对 app 发起 `POST /` 请求
      return app.httpRequest()
        .post('/api/v1/user/verfifyEmail')
        .type('json')
        .send({
          id: 'g',
        })
        .expect(200) // 期望返回 status 200
        .expect({
          sendEmail_success: true,
        });
    });
  });

  describe('mobileLogin test', () => {
    it('should mobileLogin', () => {
      return app.httpRequest()
      .post('/api/v1/user/mobileLogin')
      .type('json')
      .send({
        mobile: '18693939177',
      })
      .expect(200) // 期望返回 status 200
      .expect({
        mobileLogin_sucess: true,
        userId: 'g',
      });
    });
  });

  describe('changeVip test', () => {
    it('should changeVip', () => {
      return app.httpRequest()
      .post('/api/v1/user/changeVip')
      .type('json')
      .send({
        id: 'g',
        vip: true,
      })
      .expect(200) // 期望返回 status 200
      .expect({
        changeVip_sucess: true,
      });
    });
  });

  describe('getVip test', () => {
    it('should getVip', () => {
      return app.httpRequest()
      .post('/api/v1/user/getVip')
      .type('json')
      .send({
        id: 'byn',
      })
      .expect(200) // 期望返回 status 200
      .expect({
        vip: true,
      });
    });
  });

  describe('getLevel test', () => {
    it('should getLevel', () => {
      return app.httpRequest()
      .post('/api/v1/user/getLevel')
      .type('json')
      .send({
        id: 'byn',
      })
      .expect(200) // 期望返回 status 200
      .expect({
        level: 6,
      });
    });
  });

  describe('uploadAvatar test', () => {
    it('should upload image', () => {
      return app.httpRequest()
      .post('/api/v1/user/uploadAvatar')
      .field('id', '123')
      .attach('file', 'test/controller/ren.png')
      .expect(302)
    });
  });

  describe('getPersonalAccount test', () => {
    it('should getPersonalAccount', () => {
      return app.httpRequest()
      .post('/api/v1/user/getPersonalAccount')
      .field('id', true)
      .attach('file', 'test/controller/ren.png')
      .expect(302)
    });
  });

});
