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
        "level int," +
        "vip VARCHAR(100)," +
        "primary key (id)" +
        ");";
      await app.mysql.query(sql);
      try {
        const is_insert = await app.mysql.get('newsuser', { id: _body.id });
        if (is_insert === null) {
          await app.mysql.insert('newsuser', { id: _body.id, password: _body.password, level: 1, vip: '0' });
          return true;
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
      "image VARCHAR(200)," +
      "level int," +
      "vip VARCHAR(100)," +
      "primary key (id)" +
      ");";
    await app.mysql.query(sql);
      const result = await app.mysql.get('newsuser', { id: _body.id, password: _body.password });
      if (result === null) {
        return false;
      }
      return true;
    }


    async changePassword(_body){
        const is_insert = await app.mysql.get('newsuser', { id: _body.id, password: _body.old_password });
        if (is_insert === null) {
          return false;
        }
        else{
          await app.mysql.update('newsuser', { id: _body.id, password: _body.password });
          return true;
        }
    }

    async changeEmail(_body){
      try {
        await app.mysql.update('newsuser', { id: _body.id, email: _body.email });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async changeMobile(_body){
      try {
        await app.mysql.update('newsuser', { id: _body.id, mobile: _body.mobile });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async mobileLogin(body){
      const SMSClient = require('@alicloud/sms-sdk');
      // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
      const accessKeyId = 'LTAINBI7GDcyzx8X';
      const secretAccessKey = '7Py5FG9GaLvvXy2EImX3hMqn0MYlo1';
      const phoneNumbers = body.mobile;
      const user = await app.mysql.get('newsuser', {mobile: phoneNumbers});
      var userId;
      if(user === null){
        userId = "user" + body.mobile;
        await app.mysql.insert('newsuser', {id: userId, mobile: phoneNumbers});
      }
      else{
        userId = user.id;
      }
      //初始化sms_client
      try{
        let smsClient = new SMSClient({accessKeyId, secretAccessKey});
        smsClient.sendSMS({
          PhoneNumbers: phoneNumbers,
          SignName: '代码操场',
          TemplateCode: 'SMS_110895009',
          TemplateParam: '{"code":' + body.code + '}',
        });
      }catch(err){
        console.error(err);
      }
      return {
        flag: true,
        userId: userId,
      };
    }


    async verfifyEmail(body){
      const user = await app.mysql.get('newsuser', { id: body.id });
      const email = user.email;
      const password = user.password;
      var nodemailer  = require('nodemailer');
      var mailTransport = nodemailer.createTransport({
        host : 'smtp.163.com',
        port : 465,
        secure: true, // 使用SSL方式（安全方式，防止被窃取信息）
        auth : {
            user : 'mymxhdd@163.com',
            pass : '19961127mym'
        },
      });
      var options = {
        from           : 'mymxhdd@163.com',
        to             : email,
        subject        : '代码操场',
        text           : '代码操场',
        html           : `<h1>你好，您的账户密码为${password}</h1><p><img src="cid:00000001"/></p>`,
      };
      try{
        mailTransport.sendMail(options, function(err, msg){
          if(err){
            console.error(err);
            return false;
          }
          return true;
        });
    }catch(err){
      console.error(err);
      return false;
    }
  }

    async changeVip(body){
      try {
        const flag = body.vip === true? '1' : '0';
        await app.mysql.update('newsuser', { id: body.id, vip: flag });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async getVip(body){
      try {
        const result = await app.mysql.get('newsuser', { id: body.id });
        if(result.vip === '1'){
          return true;
        }
        return false;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async getLevel(body){
      try {
        const result = await app.mysql.get('newsuser', { id: body.id });
        return result.level;
      } catch (err) {
        console.error(err);
        return false;
      }
    }

    async getPersonalAccount(body){
      try {
        const result = await app.mysql.get('newsuser', { id: body.id });
        return {
          img: result.image,
          email: result.email,
          mobile: result.mobile,
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  }

  return UserService;
};
