// app/controller/user.js
module.exports = app => {
    class UserController extends app.Controller {
        async signup() {
            
            const body = this.ctx.request.body;
            
            var str
            var id;
            var password;
            
            for(var a in body){
                str = body[a];
            }
            for(var i=0; i<str.length; i++){
                if(str.substring(i,i+4) == "\"id\""){
                    for(var j=i+8; j<str.length; j++){
                        var count = 0;
                        while(str[j+count] != '\r'){
                            count++;
                        }
                        id = str.substring(j, j+count);
                        break;
                    }
                }
                if(str.substring(i, i+10) == "\"password\""){
                    for(var j=i+14; j<str.length; j++){
                        var count = 0;
                        while(str[j+count] != '\r'){
                            count++;
                        }
                        password = str.substring(j, j+count);
                        break;
                    }
                }
            }
            console.log(body);
            const result = await this.ctx.service.user.signup(id, password);
            this.ctx.body = {
                signup_success: result,
            };
            
      }
      
        async login(){
            const body = this.ctx.request.body;
            var str
            var id;
            var password;
            
            for(var a in body){
                str = body[a];
            }
            for(var i=0; i<str.length; i++){
                if(str.substring(i,i+4) == "\"id\""){
                    for(var j=i+8; j<str.length; j++){
                        var count = 0;
                        while(str[j+count] != '\r'){
                            count++;
                        }
                        id = str.substring(j, j+count);
                        break;
                    }
                }
                if(str.substring(i, i+10) == "\"password\""){
                    for(var j=i+14; j<str.length; j++){
                        var count = 0;
                        while(str[j+count] != '\r'){
                            count++;
                        }
                        password = str.substring(j, j+count);
                        break;
                    }
                }
            }
            const result = await this.ctx.service.user.login(id, password);
            this.ctx.body = {
                signup_success: result,
            };
        }
    }
    return UserController;
};


