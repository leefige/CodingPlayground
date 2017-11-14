import React, { Component } from 'react'
import { post } from "../utils/Request"
import { Link } from 'react-router-dom'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Header extends Component {
  handleLogout() {
    this.props.onLogout();
  }

  componentWillMount() {
    this.autoLogin();
  }

  async autoLogin() {
    post('/user/autoLogin', {
      autoLogin: true,
    })
      .then((responseJson) => {
        if (responseJson.autoLogin_success) {
          this.props.onLogin(responseJson.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.state ?
          <div className="logout-header">
            <span className="header-username">{this.props.id}</span>
            <button type="button" class="btn btn-default" onClick={this.handleLogout.bind(this)}>登出</button>
          </div>
          :
          <div className="login-header">
            <Link to='/login' type="button" className="btn btn-success header-btn">登录</Link>
            <Link to='/signup' type="button" className="btn btn-default header-btn">注册</Link>
          </div>
        }
      </div>
    )
  }
}
export default Header
