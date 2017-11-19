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
          <div className='row'>
            <MapCard levelNumber="1" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="2" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="3" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="4" onSelectLevel={this.handleLevelClick.bind(this)}/>
          </div>
          <div className='row'>
            <MapCard levelNumber="5" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="6" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="7" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="8" onSelectLevel={this.handleLevelClick.bind(this)}/>
          </div>
          <div className='row'>
            <MapCard levelNumber="9" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="10" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="100" onSelectLevel={this.handleLevelClick.bind(this)}/>
            <MapCard levelNumber="-1" onSelectLevel={this.handleLevelClick.bind(this)}/>
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
