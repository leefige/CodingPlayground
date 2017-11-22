import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Header extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  async handleLogout() {
    post('/api/v1/user/logout', {})
    .then((responseJson) => {
      if (responseJson.logout_success) {
        this.props.onLogout();
        console.log("logout success")
      }
      else
        alert("登录失败！");
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { cookies } = this.props;
    if (cookies.get('isLogin') === "true") {
      const id = cookies.get('id');
      return(
        <div className="logout-header">
        <Link to='/index' type="button" className="btn btn-warning header-btn">返回主页</Link>
        <Link to='/personal/account' type="button" className="btn btn-success header-btn">{id}</Link>
        <button type="button" className="btn btn-default" onClick={this.handleLogout.bind(this)}>登出</button>
      </div>
      )
    }
    else {
      return(
        <div className="login-header">
        <Link to='/login' type="button" className="btn btn-success header-btn">登录</Link>
        <Link to='/signup' type="button" className="btn btn-default header-btn">注册</Link>
      </div>
      )
    }
  }
}
export default withCookies(Header);
