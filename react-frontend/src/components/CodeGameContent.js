import React, { Component } from 'react';
import Scene from './Scene';
import Programming from './Programming';
import { mainControl } from '../logic/MainControl';
import { post } from '../utils/Request'

class CodeGameContent extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params)
    console.log("map id:" + props.match.params.mapID);
    
    this.state = {
      mapInitState: {},
      mapResource: {},     
      blockConfig: {},
      // 待解决：recordData要不要作为state刷新子部件？
    };
  }

  componentWillMount() {
    // 获取地图信息和blockly配置
    post('http://127.0.0.1:7001/map', {
			id: props.match.params.mapID,
		})	
    .then((responseJson) => {
      mainControl.load(responseJson.mapInitState);
      this.setState({
        mapInitState: responseJson.mapInitState,
        mapResource: responseJson.mapResource,
        blocklyConfig: responseJson.blocklyConfig,
      });
    })
    .catch((error) => {
      console.error(error);
    });
    // 获取播放记录
    if (this.props.match.params.recordID) {
      post('http://127.0.0.1:7001/map', {
        id: props.match.params.mapID,
      })	
      .then((responseJson) => {
        const player = mainControl.player;
        player.load(responseJson.recordData);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  handleCodeSubmit(_actionList) {
    this.setState({
      actionList: _actionList,
    });
    mainControl.addActionList(_actionList);
  }

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-6'>
          <Scene/>
        </div>
        <div className='col-xs-12 col-md-6 col-md-offset-6'>
          <Programming blockconfig = {this.state.blockConfig} onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default CodeGameContent;