import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {
  render() {
    return (
      <div className='col-md-5'>
        <div className="form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>Login to our site</h3>
              <p>Enter username and password to log on:</p>
            </div>
            <div className="form-top-right">
              <i className="fa fa-lock"></i>
            </div>
          </div>
          <div className="form-bottom">
            <form role="form" action="" method="post" class="login-form">
              <div className="form-group">
                <label className="sr-only" for="form-username">Username</label>
                <input type="text" name="form-username" placeholder="Username..." className="form-username form-control" id="form-username" />
				      </div>
                <div class="form-group">
                  <label class="sr-only" for="form-password">Password</label>
                  <input type="password" name="form-password" placeholder="Password..." class="form-password form-control" id="form-password" />
				        </div>
                  <button type="submit" class="btn">Sign in!</button>
				    </form>
          </div>
		    </div>
      </div>
    );
  }
}

export default Signup