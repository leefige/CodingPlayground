// config/config.default.js
'use strict';
module.exports = appInfo => {
  const config = {
    // middleware: [ 'isLogin' ],
    mysql: {
      client: {
        host: 'db',
        port: '3306',
        user: 'root',
        password: 'newpass',
        database: 'world',
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: false,
      //domainWhiteList: [ 'http://localhost:3000' ],
      // {
      // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    // },
    },
    
  };

  config.cors = {
    origin:'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    }
  // should change to your own
  config.keys = appInfo.name + '_egg';

  return config;
};

