// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/map.test.js', () => {
  afterEach(mock.restore);
  describe('getId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .post('/api/v1/map/getId')
        .type('json')
        .send({
          userid: '123',
          mapid: '301',
        })
        .expect(200);
    });

    it('should get null when map not exist', () => {
      return app.httpRequest()
        .post('/api/v1/map/getId')
        .type('json')
        .send({
          userid: '123',
          mapid: '23411',
        })
        .expect(204)
        .expect({});
    });

    it('should get 400 when body is wrong', () => {
      return app.httpRequest()
      .post('/api/v1/map/getId')
      .type('json')
      .send('error')
      .expect(400);
    })
  });

  describe('insertId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .get('/api/v1/map/insertId')
      .expect(200);

    });
  });

  describe('updateblockly test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/api/v1/map/updateBlockly')
      .type('json')
      .send({
        userid: 123411,
        mapid: 303,
        savedSolution: {},
      })
      .expect(200);
    });
  });

});
