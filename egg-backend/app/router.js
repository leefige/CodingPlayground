// app/router.js
module.exports = app => {
    app.get('/', app.controller.home.index);
    app.get('/search', app.controller.search.search);
    app.get('/user/signup/:id/:password', app.controller.user.signup);
    app.get('/user/login/:id/:password', app.controller.user.login);
  };