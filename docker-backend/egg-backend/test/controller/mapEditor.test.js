// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/mapEditor.test.js', () => {
  afterEach(mock.restore);
  describe('getId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .post('/api/v1/mapEditor/getAll')
        .expect(200);
    });

  });

  describe('insertId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/api/v1/mapEditor/insertId')
      .type('json')
      .send({
        id: '301',
        userId: '213',
        data: '2',
      })
      .expect(200)
      .expect({
        insertMap_sucess: true,
      });
    });
  });

});
