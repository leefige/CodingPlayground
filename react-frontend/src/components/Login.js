import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div className='col-md-4 col-md-offset-4'>
        <div className="form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>欢迎来到CodingPlayground！</h3>
              <h4>进入游戏前请登录：</h4>
            </div>
            <div className="form-top-right">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="form-bottom">
            <form role="form" action="" method="post" className="login-form">
              <div className="form-group">
                <label className="sr-only" for="form-username">Username</label>
                <input type="text" name="form-username" placeholder="邮箱" className="form-username form-control" id="form-username" />
				      </div>
                <div className="form-group">
                  <label className="sr-only" for="form-password">Password</label>
                  <input type="password" name="form-password" placeholder="密码" className="form-password form-control" id="form-password" />
				        </div>
                  <button type="submit" className="btn btn-success btn-form">进入游戏！</button>
				    </form>
          </div>
		    </div>
      </div>
    );
  }
}

export default Login