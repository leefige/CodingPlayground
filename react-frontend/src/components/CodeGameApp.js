import CodeGameContent from '../pages/Gaming/CodeGameContent';
import MapEditor from '../pages/MapEditor/MapEditor';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import Login from './Login';
import Account from '../pages/Personal/Account';
import Level from '../pages/Level/Level';
import MapHall from '../pages/Level/MapHall';
import { Route } from 'react-router-dom';
import { post } from "../utils/Request";

class CodeGameApp extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      id: '',
      topLevel: 1,
      vip: false,
    };
  }

  componentDidMount() {
    this.updateTopLevel();
    this.updateVIP();
  }

  handleLogin(id) {
    this.setState({
      isLogin: true,
      id: id,
    });
    this.updateTopLevel();
    this.updateVIP();
  }

  async updateTopLevel() {
    post('/api/v1/user/getLevel', {
      id: this.props.userId,
		})
    .then((responseJson) => {
      // console.log("level res: ", responseJson);
      this.setState({
        topLevel: responseJson.level + 1,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async updateVIP() {
    post('/api/v1/user/getVip', {
      id: this.props.userId,
		})
    .then((responseJson) => {
      // console.log("vip res: ", responseJson);
      this.setState({
        vip: responseJson.vip,
      });
    })
    .catch((error) => {
      console.error(error);
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
              <CodeGameContent {...props} userType="game" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id} topLevel={this.state.topLevel} vip={this.state.vip} />
            } />
          <Route path="/share/:mapID/:shareUserID"
            component={props =>
              <CodeGameContent {...props} userType="share" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id} />
            } />
          <Route path="/mapEditor" component={MapEditor} />
          <Route path="/mapHall" component={MapHall} />
          <Route path="/login" component={props => <Login {...props} onLogin={this.handleLogin.bind(this)} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetPassword" component={ForgetPassword} />
          <Route path="/personal/account" component={props => <Account {...props} userId={this.state.id} updateVIP={this.updateVIP.bind(this)}/>} />
          <Route path="/index" component={props => <Level {...props} userId={this.state.id} topLevel={this.state.topLevel} vip={this.state.vip}/>} />
          <Footer className='footer-style' />
        </div>
      </div>
    );
  }
}

export default CodeGameApp;
