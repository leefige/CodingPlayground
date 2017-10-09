// config/config.default.js

  module.exports = appInfo => {
    const config = {
     // middleware: [ 'isLogin' ],
     mysql: {
      client: {
       host: 'localhost',
       port: '3306',
       user: 'test',
       password: '123456',
       database: 'world',
      },
      app: true,
      agent: false,
     },
     security: {
      csrf: false,//{
        //queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        //bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      //},
    },
    };
   
    // should change to your own
    config.keys = appInfo.name + '_egg';
   
    return config;
   };