'use strict';
module.exports = app => {
  class UserService extends app.Service {
    async signup(_body) {
      const sql = "create table if not exists newsuser(" +
        "id VARCHAR(100)," +
        "password VARCHAR(100)," +
        "email VARCHAR(100)," +
        "mobile VARCHAR(100)," +
        "image VARCHAR(200)," +
        "level VARCHAR(100)," +
        "vip VARCHAR(100)," +
        "primary key (id)" +
        ");";
      await app.mysql.query(sql);
      try {
        const is_insert = await app.mysql.get('newsuser', { id: _body.id });
        if (is_insert === null) {
          const result = await app.mysql.insert('newsuser', { id: _body.id, password: _body.password, level: '1', vip: '0' });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
        return false;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async login(_body) {
      const sql = "create table if not exists newsuser(" +
      "id VARCHAR(100)," +
      "password VARCHAR(100)," +
      "email VARCHAR(100)," +
      "mobile VARCHAR(100)," +
      "image TEXT," +
      "level VARCHAR(100)," +
      "vip VARCHAR(100)," +
      "primary key (id)" +
      ");";
    await app.mysql.query(sql);
      try {
        const result = await app.mysql.get('newsuser', { id: _body.id, password: _body.password });
        if (result === null) {
          return false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }


    async changePassword(_body){
      try {
        const is_insert = await app.mysql.get('newsuser', { id: _body.id, password: _body.old_password });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newsuser', { id: _body.id, password: _body.password });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async changeEmail(_body){
      try {
        const is_insert = await app.mysql.get('newsuser', { id: _body.id });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newsuser', { id: _body.id, email: _body.email });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async changeMobile(_body){
      try {
        const is_insert = await app.mysql.get('newsuser', { id: _body.id });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newsuser', { id: _body.id, mobile: _body.mobile });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async verfifyMobile(body){
      const SMSClient = require('@alicloud/sms-sdk');
      // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
      const accessKeyId = 'LTAINBI7GDcyzx8X';
      const secretAccessKey = '7Py5FG9GaLvvXy2EImX3hMqn0MYlo1';
      const phoneNumbers = app.mysql.get('newsuser', { id: body.id }).mobile;
      //初始化sms_client
      let smsClient = new SMSClient({accessKeyId, secretAccessKey})
      smsClient.sendSMS({
        PhoneNumbers: '18693939177',
        SignName: '代码操场',
        TemplateCode: 'SMS_110895009',
        TemplateParam: '{"code":"12345"}'
      }).then(function (res) {
          let {Code}=res
          if (Code === 'OK') {
              //处理返回参数
              return true;
          }}, function (err) {
            return false;
        })
    }

    async verfifyEmail(body){
      const email = app.mysql.get('newsuser', { id: body.id }).email;
      var nodemailer  = require('nodemailer');
      var mailTransport = nodemailer.createTransport({
        host : 'smtp.qq.com',
        secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
        auth : {
            user : '845285227@qq.com',
            pass : '19961127mymxhdd'
        },
      });
      var options = {
        from           : '845285227@qq.com',
        to             : 'maoym15@mails.tsinghua.edu.cn',
        subject        : '一封来自Node Mailer的邮件',
        text           : '一封来自Node Mailer的邮件',
        html           : '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
      };

      mailTransport.sendMail(options, function(err, msg){
          if(err){
              console.log(err);
          }
          else {
              console.log(msg);
          }
    });
    }

    async changeVip(body){
      try {
        const is_insert = await app.mysql.get('newsuser', { id: body.id });
        if (is_insert === null) {
          return false;
        }
        else{
          const result = await app.mysql.update('newsuser', { id: body.id, vip: body.vip });
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }
  return UserService;
};
