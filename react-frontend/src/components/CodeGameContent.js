import React, { Component } from 'react';
import Scene from './Scene';
import Programming from './Programming';
import { mainControl } from '../logic/MainControl';
import { post } from '../utils/Request'

class CodeGameContent extends Component {
  constructor(props) {
    super(props);
    // console.log(props.match.params)
    // console.log("map id:" + props.match.params.mapID);
    
    this.state = {
      mapInitState: {},
      mapResource: {
        "width":8, 
        "height":8, 
        "id":[
          0, 1, 2, 3, 4, 7, 8, 9,
          16, 50, 50, 50, 20, 23, 24, 25,
          32, 50, 50, 50, 36, 23, 24, 25,
          48, 49, 50, 51, 52, 23, 24, 25,
          64, 65, 66, 67, 68, 39, 40, 41,
          7, 8, 8, 8, 8, 8, 8, 9,
          23, 24, 24, 24, 24, 24, 24, 25,
          39, 40, 40, 40, 40, 40, 40, 41
        ]},     
      blockConfig: [{"name":"动作","blocks":[{"type":"go"},{"type":"turn_left"},{"type":"turn_right"}]},{"name":"变量","blocks":[{"type":"variables_set"},{"type":"variables_get"}]},{"name":"数学","blocks":[{"type":"math_number"},{"type":"math_arithmetic","values":{"A":{"type":"math_number","shadow":true,"fields":{"NUM":0}},"B":{"type":"math_number","shadow":true,"fields":{"NUM":0}}}},{"type":"math_modulo","values":{"DIVIDEND":{"type":"math_number","shadow":true,"fields":{"NUM":3}},"DIVISOR":{"type":"math_number","shadow":true,"fields":{"NUM":2}}}},{"type":"math_single"},{"type":"math_trig"},{"type":"math_constant"},{"type":"math_random_int","values":{"FROM":{"type":"math_number","shadow":true,"fields":{"NUM":0}},"TO":{"type":"math_number","shadow":true,"fields":{"NUM":5}}}}]},{"name":"分支","blocks":[{"type":"controls_if"},{"type":"logic_compare"}]},{"name":"循环","blocks":[{"type":"controls_whileUntil"},{"type":"controls_for","values":{"FROM":{"type":"math_number","shadow":true,"fields":{"NUM":0}},"TO":{"type":"math_number","shadow":true,"fields":{"NUM":5}},"BY":{"type":"math_number","shadow":true,"fields":{"NUM":1}}}}]},{"name":"文本","blocks":[{"type":"text"},{"type":"text_print","values":{"TEXT":{"type":"text","shadow":true,"fields":{"TEXT":"abc"}}}}]}],
      // 待解决：recordData要不要作为state刷新子部件？
    };
  }

  componentWillMount() {
    // 获取地图信息和blockly配置
    post('http://127.0.0.1:7001/map/getId', {
			id: this.props.match.params.mapID,
		})	
    .then((responseJson) => {
      console.log("load map sucess");
      console.log(responseJson.mapInitState);
      console.log(responseJson.mapResource);
      console.log(responseJson.blocklyConfig);
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
      post('http://127.0.0.1:7001/record/getId', {
        id: this.props.match.params.mapID,
      })    
      .then((responseJson) => {
        console.log("load record sucess");
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
          <Scene mapResource={this.state.mapResource}/>
        </div>
        <div className='col-xs-12 col-md-6 col-md-offset-6'>
          <Programming ref="prog_ref" id="programming" blockconfig={this.state.blockConfig} onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default CodeGameContent;