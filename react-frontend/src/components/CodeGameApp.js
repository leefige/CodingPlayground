import CodeGameContent from '../pages/Gaming/CodeGameContent';
import MapEditor from '../pages/MapEditor/MapEditor';
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import Account from '../pages/Personal/Account';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class CodeGameApp extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false,
      id: '卡尔',
    }
  }

  handleLogin(id) {
    this.setState({
      isLogin: true,
      id: id
    })
  }

  handleLogout() {
    this.setState({
      isLogin: false
    })
  }

  getIsLogin() {
    return this.state.isLogin;
  }

  getLoginUserId() {
    return this.state.id;
  }
  
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className='game-header row'>
            <div className="col-md-offset-4 btn-group clear-fix text-left pull-left" role="group" aria-label="...">
              <Link to='/map/301' type="button" class="btn btn-default">1</Link>
              <Link to='/map/302' type="button" class="btn btn-default">2</Link>
              <Link to='/map/303' type="button" class="btn btn-default">3</Link>
              <Link to='/map/304' type="button" class="btn btn-default">4</Link>
              <Link to='/map/305' type="button" class="btn btn-default">5</Link>
              <Link to='/map/306' type="button" class="btn btn-default">6</Link>
              <Link to='/map/307' type="button" class="btn btn-default">7</Link>
              <Link to='/map/308' type="button" class="btn btn-default">8</Link>
              <Link to='/map/309' type="button" class="btn btn-default">9</Link>
              <Link to='/map/310' type="button" class="btn btn-default">10</Link>
            </div>
        
            <div className='pull-right'>
              <Header
                state={this.state.isLogin}
                id={this.state.id}
                onLogin={this.handleLogin.bind(this)}
                onLogout={this.handleLogout.bind(this)} />
            </div>
          </div>
          <Route path="/map/:mapID" 
            component={props => 
              <CodeGameContent {...props} userType="game" getIsLogin={this.getIsLogin.bind(this)} getLoginUserId={this.getLoginUserId.bind(this)} />
            } />
          <Route path="/share/:mapID/:shareUserID?" 
            component={props => 
              <CodeGameContent {...props} userType="share" getIsLogin={this.getIsLogin.bind(this)} getLoginUserId={this.getLoginUserId.bind(this)} />
            } />
          <Route path="/mapEditor" component={MapEditor} />
          <Route path="/login" component={props => <Login {...props} onLogin={this.handleLogin.bind(this)} />} />
          <Route path="/signup" component={Signup} />
          <Route path="/personal/account" component={props => <Account {...props} userId={this.getLoginUserId.bind(this)}/>} />
          <Footer className='footer-style' />
        </div>
      </div>
    );
  }
}

export default CodeGameApp
