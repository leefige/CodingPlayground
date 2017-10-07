// app/router.js
module.exports = app => {
    app.get('/', app.controller.home.index);
    app.get('/search', app.controller.search.search);
    app.post('/user/signup', app.controller.user.signup);
    app.post('/user/login', app.controller.user.login);
  };