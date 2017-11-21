// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/mapEditor.test.js', () => {
  afterEach(mock.restore);
  describe('getId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .post('/api/v1/mapEditor/getId')
        .type('json')
        .send({
          id: '233',
          userId: '23',
        })
        .expect(204);
    });

    it('should get null when map not exist', () => {
      return app.httpRequest()
        .post('/api/v1/mapEditor/getId')
        .type('json')
        .send({
          id: '23411',
          userId: '233',
        })
        .expect(204)
        .expect({});
    });

    it('should get 400 when body is wrong', () => {
      return app.httpRequest()
        .post('/api/v1/mapEditor/getId')
        .type('json')
        .send('error')
        .expect(400);
    })
  });

  describe('insertId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/api/v1/mapEditor/insertId')
      .type('json')
      .send({
        id: '123',
        userId: '213',
        data: '2',
      })
      .expect(200);
    });
  });

});
