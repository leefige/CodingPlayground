import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import CodeGameContent from './CodeGameContent'
import Footer from './Footer' 

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class CodeGameApp extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor() {
    super()
    this.state = {
      isLogin:false,
      id:'卡尔',
    }
    
    console.log(sessionStorage.getItem('key'));
  }

  componentWillMount() {
    const { cookies } = this.props;
    if (cookies.get('isLogin') === 'true') {
      this.setState({
        isLogin : true,
        id : cookies.get('id'),
      })
      console.log("is login");
      console.log(cookies.get('id'));
      console.log(this.state);
    }
    console.log(document.cookie);
    console.log(cookies);
  }

  handleLogin(id) {
    const { cookies } = this.props;
    cookies.set('id', id, { path: '/' });
    cookies.set('isLogin', 'true', { path: '/' });
    this.setState({
      isLogin : true,
      id : id
    })
  }

  handleLogout() {
    const { cookies } = this.props;
    cookies.set('isLogin', 'false', { path: '/' });
    this.setState({
      isLogin:false
    })
  }
  render() {    
    return (
      <div className="container">
        <LoginHeader
          state = {this.state.isLogin}
          id = {this.state.id}
          onLogin = {this.handleLogin.bind(this)}
          onLogout = {this.handleLogout.bind(this)}/>  
        <CodeGameContent />
        <Footer />
      </div>
    )
  }
}

export default withCookies(CodeGameApp)
