import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MapCard from "./MapCard";

class Level extends Component {
  constructor() {
    super();
    this.state = {
      dest: 0,
      topLevel: 1
    };
  }

  handleLevelClick(level) {
    this.setState({
      dest: level,
    });
  }

  isLocked(level) {
    if (level > this.state.topLevel && level !== 100) {
      return true;
    }
    return false;
  }

  render() {
    if (this.state.dest === 0) {
      return (
        <div className='col-md-8 col-md-offset-2'>
          <div className='row'>
            <MapCard levelNumber="1" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="2" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="3" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="4" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
          </div>
          <div className='row'>
            <MapCard levelNumber="5" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="6" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="7" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="8" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
          </div>
          <div className='row'>
            <MapCard levelNumber="9" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="10" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="100" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="-1" lock={this.isLocked.bind(this)} onSelectLevel={this.handleLevelClick.bind(this)}/>
          </div>
        </div>
      );
    }
    else {
      if (this.state.dest === 100) {
        return (<Redirect push to={"/mapHall"}/>);
      }
      else if (this.state.dest > 0) {
        return (<Redirect push to={"/map/" + (300 + this.state.dest)}/>);
      }
      else {
        return (<Redirect push to="/mapEditor"/>);
      }
    }
  }
}

export default Level;
