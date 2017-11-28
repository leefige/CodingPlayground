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
  });

  describe('updateblockly test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
      .post('/api/v1/map/updateBlockly')
      .type('json')
      .send({
        userid: '123411',
        mapid: '303',
        blockly: {},
        curLevel: 4,
      })
      .expect(200);
    });
  });

});
