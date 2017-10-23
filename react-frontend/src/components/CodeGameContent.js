import React, { Component } from 'react';
import Scene from './Scene';
import Programming from './Programming';
import { mainControl } from '../logic/MainControl';

class CodeGameContent extends Component {
  constructor(props) {
    super();
    console.log(props.match.params)
    console.log("map id:" + props.match.params.mapID);
    
    this.state = {
      actionList: [],
    };
  }

  handleCodeSubmit(_actionList) {
    this.setState({
      actionList: _actionList,
    });
    mainControl.addActionList(_actionList);
  }

  handleActionFinish() {
    this.setState({
      actionList: []
    });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-6'>
          <Scene actionList={this.state.actionList} onActionFinish={this.handleActionFinish.bind(this)}/>
        </div>
        <div className='col-xs-12 col-md-6 col-md-offset-6'>
          <Programming onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default CodeGameContent;