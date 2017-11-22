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
import { Route, Redirect } from 'react-router-dom';
import { post } from "../utils/Request";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class CodeGameApp extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      id: '',
      topLevel: 1,
      vip: false,
    };
  }

  componentWillMount() {
    const { cookies } = this.props;
    this.state = {
      isLogin: cookies.get('isLogin') || false,
      id: cookies.get('id') || '',
    };
  }

  componentDidMount() {
    this.updateTopLevel();
    this.updateVIP();
  }

  handleLogin(id) {
    const { cookies } = this.props;
    cookies.set('id', id, { path: '/' });
    cookies.set('isLogin', 'true', { path: '/' });
    this.setState({
      isLogin: true,
      id: id,
    });
    this.updateTopLevel();
    this.updateVIP();
    global.id = id;
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
    });;///
  }

  handleLogout() {
    const { cookies } = this.props;
    cookies.set('isLogin', 'false', { path: '/' });
    this.setState({
      id: '',
      isLogin: false,
    });
    alert("您已登出！");
  }

  requireLogin = (props, isLogin, shouldRender) => {
    if (!isLogin) {
      return <Redirect push to="/login"/>;
    }
    else
      return shouldRender;
  }

  requireLogout = (props, isLogin, shouldRender) => {
    if (isLogin) {
      return <Redirect push to="/index"/>;
    }
    else
      return shouldRender;
  }

  render() {
    const { cookies } = this.props;
    const isLogin = cookies.get("isLogin") === "true";
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
            component={props => this.requireLogin(props, isLogin,
              <CodeGameContent {...props}
                topLevel={this.state.topLevel} vip={this.state.vip} userType="game" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id}  />)
            } />
          <Route path="/share/:mapID/:shareUserID"
            component={props => this.requireLogin(props, isLogin,
              <CodeGameContent {...props} userType="share" getIsLogin={this.state.isLogin} getLoginUserId={this.state.id} />)
            } />
          {/* <Route path="/mapEditor" component={props => <MapEditor {...props} userId={this.state.id}/>} /> */}
          <Route path="/mapEditor/:mapID?" component={props => this.requireLogin(props, isLogin, <MapEditor />)} onChange={this.requireLogin.bind(this)} />
          <Route path="/mapHall" component={props => this.requireLogin(props, isLogin, <MapHall />)} />
          <Route path="/login" component={props => this.requireLogout(props, isLogin, <Login {...props} onLogin={this.handleLogin.bind(this)} />)} />
          <Route path="/signup" component={props => this.requireLogout(props, isLogin, <Signup />)} />
          <Route path="/forgetPassword" component={props => this.requireLogout(props, isLogin, <ForgetPassword />)} />
          <Route path="/personal/account"
            component={
              props => this.requireLogin(props, isLogin,
                <Account {...props} userId={this.state.id} updateVIP={this.updateVIP.bind(this)}/>)} />
          <Route path="/index"
            component={
              props => this.requireLogin(props, isLogin,
                <Level {...props} userId={this.state.id} topLevel={this.state.topLevel} vip={this.state.vip}/>)}/>
          <Footer className='footer-style' />
        </div>
      </div>
    );
  }
}

export default withCookies(CodeGameApp);
