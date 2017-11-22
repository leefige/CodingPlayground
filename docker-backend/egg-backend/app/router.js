// app/router.js
'use strict';
module.exports = app => {
  app.post('/api/v1/user/signup', app.controller.user.signup);
  app.post('/api/v1/user/login', app.controller.user.login);
  app.post('/api/v1/user/logout', app.controller.user.logout);
  app.post('/api/v1/user/autoLogin', app.controller.user.autoLogin);
  app.post('/api/v1/map/getId', app.controller.map.getId);
  app.post('/api/v1/map/getMapList', app.controller.mapEditor.getAll);
  app.post('/api/v1/user/changePassword', app.controller.user.changePassword);
  app.post('/api/v1/user/changeEmail', app.controller.user.changeEmail);
  app.post('/api/v1/user/changeMobile', app.controller.user.changeMobile);
  app.post('/api/v1/map/updateBlockly', app.controller.map.updateBlockly);
  app.post('/api/v1/mapEditor/insertId', app.controller.mapEditor.insertId);
  app.post('/api/v1/mapEditor/getAll', app.controller.mapEditor.getAll);
  app.post('/api/v1/user/mobileLogin', app.controller.user.mobileLogin);
  app.post('/api/v1/user/verfifyEmail', app.controller.user.verfifyEmail);
  app.post('/api/v1/user/uploadAvatar', app.controller.user.uploadAvatar);
  app.post('/api/v1/user/getVip', app.controller.user.getVip);
  app.post('/api/v1/user/getLevel', app.controller.user.getLevel);
  app.post('/api/v1/user/getPersonalAccount', app.controller.user.getPersonalAccount);
  app.post('/api/v1/user/changeVip', app.controller.user.changeVip);
};
