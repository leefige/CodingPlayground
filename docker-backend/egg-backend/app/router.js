// app/router.js
'use strict';
module.exports = app => {
  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/login', app.controller.user.login);
  app.post('/user/logout', app.controller.user.logout);
  app.post('/user/autoLogin', app.controller.user.autoLogin);
  app.post('/map/getId', app.controller.map.getId);
  app.post('/record/getId', app.controller.record.getId);
  app.get('/map/insertId', app.controller.map.insertId);
  app.get('/record/insertId', app.controller.record.insertId);
};
