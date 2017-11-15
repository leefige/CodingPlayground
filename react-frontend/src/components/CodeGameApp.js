import CodeGameContent from '../pages/Gaming/CodeGameContent';
import MapEditor from '../pages/MapEditor/MapEditor';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import Account from '../pages/Personal/Account';
import Level from '../pages/Level/Level';
import { Route, Redirect } from 'react-router-dom';
class CodeGameApp extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      id: '',
    };
  }

  handleLogin(id) {
    this.setState({
      isLogin: true,
      id: id,
    });
  }

  handleLogout() {
    this.setState({
      id: '',
      isLogin: false,
    });
    alert("您已登出！");
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className='game-header row'>
            <div className='pull-right'>
              <Header
                pathname={this.props.location.pathname}
                isLogin={this.state.isLogin}
                id={this.state.id}
                onLogin={this.handleLogin.bind(this)}
                onLogout={this.handleLogout.bind(this)} />
            </div>
          </div>
          <Route path="/map/:mapID"
            component={props =>
              <CodeGameContent {...props} userType="game" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id} />
            } />
          <Route path="/share/:mapID/:shareUserID"
            component={props =>
              <CodeGameContent {...props} userType="share" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id} />
            } />
          <Route path="/mapEditor" component={MapEditor} />
          <Route path="/login" component={props => <Login {...props} onLogin={this.handleLogin.bind(this)} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/personal/account" component={props => <Account {...props} userId={this.state.id}/>} />
          <Route path="/index" component={props => <Level {...props} userId={this.state.id}/>} />
          <Footer className='footer-style' />
        </div>
      </div>
    );
  }
}

export default CodeGameApp;
