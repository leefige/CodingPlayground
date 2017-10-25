// 'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/record.test.js', () => {
  afterEach(mock.restore);
  describe('getId test', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .post('/record/getId')
        .type('json')
        .send({
          id: '2341',
        })
        .expect(200)
        .expect({
          recordData: 1,
        });
    });

    it('should get null when map not exist', () => {
      return app.httpRequest()
        .post('/record/getId')
        .type('json')
        .send({
          id: '23411',
        })
        .expect(200)
        .expect(null);
    });

    it('should get 400 when body is wrong', () => {
      return app.httpRequest()
        .post('/record/getId')
        .type('json')
        .send('error')
        .expect(400);
    })
  });

});
