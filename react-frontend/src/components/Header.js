import React, { Component } from 'react';
import { post } from "../utils/Request";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Header extends Component {
  constructor() {
    super();
    this.state = {
      didAutoLogin: false,
      isAutoLogin: false,
    }
  }
  async handleLogout() {
    post('/api/v1/user/logout', {})
    .then((responseJson) => {
      if (responseJson.logout_success) {
        this.props.onLogout();
        this.setState({
          isAutoLogin : false,
        })
        console.log("logout success")
      }
      else
        alert("登录失败！");
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    this.autoLogin();
  }

  async autoLogin() {
    this.setState({
      didAutoLogin : false,
    })
    post('/api/v1/user/autoLogin', {
      autoLogin: true,
    })
      .then((responseJson) => {
        if (responseJson.autoLogin_success) {
          this.setState({
            didAutoLogin : true,
            isAutoLogin : true,
          })
          this.props.onLogin(responseJson.id);
        }
        else {
          this.setState({
            didAutoLogin : true,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.props.isLogin || this.state.isAutoLogin ?
          <div className="logout-header">
            <Link to='/index' type="button" className="btn btn-warning header-btn">返回主页</Link>
            <Link to='/personal/account' type="button" className="btn btn-success header-btn">{this.props.id}</Link>
            <button type="button" className="btn btn-default" onClick={this.handleLogout.bind(this)}>登出</button>
          </div>
          :
          <div className="login-header">
            <Link to='/login' type="button" className="btn btn-success header-btn">登录</Link>
            <Link to='/signup' type="button" className="btn btn-default header-btn">注册</Link>
          </div>
        }
        {this.state.didAutoLogin === true && this.state.isAutoLogin === false && this.props.pathname !== '/login' && this.props.pathname !== '/signup'
          ? <Redirect push to="/login"/>
          : <div></div>}
        {(this.state.isAutoLogin === true || this.props.isLogin === true) && (this.props.pathname === '/login' || this.props.pathname === '/signup')
          ? <Redirect push to="/index"/>
          : <div></div>}
      </div>
    )
  }
}
export default Header
