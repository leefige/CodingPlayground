// app/router.js
'use strict';
module.exports = app => {
  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/login', app.controller.user.login);
  app.post('/user/logout', app.controller.user.logout);
  app.post('/user/autoLogin', app.controller.user.autoLogin);
  app.post('/map/getId', app.controller.map.getId);
  app.post('/record/getId', app.controller.record.getId);
  app.post('/user/changePassword', app.controller.changePassword);
  app.post('/user/changeEmail', app.controller.changeEmail);
  app.post('/user/changeMobile', app.controller.changeMobile);
  app.post('/map/updateBlockly', app.controller.updateBlockly);
  app.get('/map/insertId', app.controller.map.insertId);
  app.get('/record/insertId', app.controller.record.insertId);
};
