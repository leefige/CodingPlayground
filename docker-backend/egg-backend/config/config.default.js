// config/config.default.js
'use strict';
module.exports = appInfo => {
  const config = {
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
      // {
      // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    // },
    },
    mail: {
      from: {
          name: 'App name',
          service: 'Gmail',
          auth: {
              user: 'gmail.name@gmail.com',
              pass: 'gmail.password'
          }
      },
      to: [
          'Zhixin Wen <wenzhixin2010@gmail.com>'
      ]
  }

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

