// test/controller/home.test.js
'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/home.test.js', () => {
  before(() => {
    // 创建当前应用的 app 实例
    app = mock.app();
    // 等待 app 启动成功，才能执行测试用例
    return app.ready();
  });
});