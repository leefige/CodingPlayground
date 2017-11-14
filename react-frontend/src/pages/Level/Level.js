import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MapCard from "./MapCard";

class Level extends Component {
  constructor() {
    super();
    this.state = {
      dest: 0,
    };
  }

  handleLevelClick(level) {
    this.setState({
      dest: level,
    });
  }

  render() {
    if (this.state.dest === 0) {
      return (
        <div className='col-md-8 col-md-offset-2'>
          <MapCard levelNumber="1" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="2" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="3" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="4" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="5" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="6" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="7" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="8" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="9" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="10" onSelectLevel={this.handleLevelClick.bind(this)}/>
          <MapCard levelNumber="-1" onSelectLevel={this.handleLevelClick.bind(this)}/>
        </div>
      );
    }
    else {
      const lv = 300 + this.state.dest;
      switch(lv) {
        case 301:
          return (<Redirect push to="/map/301"/>);
        case 302:
          return (<Redirect push to="/map/302"/>);
        case 303:
          return (<Redirect push to="/map/303"/>);
        case 304:
          return (<Redirect push to="/map/304"/>);
        case 305:
          return (<Redirect push to="/map/305"/>);
        case 306:
          return (<Redirect push to="/map/306"/>);
        case 307:
          return (<Redirect push to="/map/307"/>);
        case 308:
          return (<Redirect push to="/map/308"/>);
        case 309:
          return (<Redirect push to="/map/309"/>);
        case 310:
          return (<Redirect push to="/map/310"/>);
        default:
          return (<Redirect push to="/mapEditor"/>);
      }
    }
  }
}

export default Level;
