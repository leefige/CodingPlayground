// app/router.js
'use strict';
module.exports = app => {
  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/login', app.controller.user.login);
  app.post('/user/logout', app.controller.user.logout);
  app.post('/user/autoLogin', app.controller.user.autoLogin);
  app.post('/map/getId', app.controller.map.getId);
  app.post('/record/getId', app.controller.record.getId);
  app.post('/user/changePassword', app.controller.user.changePassword);
  app.post('/user/changeEmail', app.controller.user.changeEmail);
  app.post('/user/changeMobile', app.controller.user.changeMobile);
  app.post('/map/updateBlockly', app.controller.map.updateBlockly);
  app.post('/record/insertId', app.controller.record.insertId);
};
