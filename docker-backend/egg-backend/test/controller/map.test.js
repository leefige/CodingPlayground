// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/map.test.js', () => {
  afterEach(mock.restore);
  describe('getId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .post('/map/getId')
        .type('json')
        .send({
          id: '251',
        })
        .expect(200);
    });

    it('should get null when map not exist', () => {
      return app.httpRequest()
        .post('/map/getId')
        .type('json')
        .send({
          id: '23411',
        })
        .expect(204)
        .expect({});
    });

    it('should get 400 when body is wrong', () => {
      return app.httpRequest()
      .post('/map/getId')
      .type('json')
      .send('error')
      .expect(400);
    })
  });

  describe('insertId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .get('/map/insertId')
      .expect(200);

    });
  });

});
