// app/router.js
'use strict';
module.exports = app => {
  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/login', app.controller.user.login);
};
