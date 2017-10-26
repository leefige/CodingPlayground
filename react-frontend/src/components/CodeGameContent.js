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
      mapInitState: {
        board : {
          map : [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
        },
        character : {
          pos : { x : 4, y : 4},
          dir : 2,
        },
      },
      mapResource: {
        "width": 8,
        "height": 8,
        "id": [ 
                0, 1, 2, 3, 1, 2, 1, 4,
                16, 5, 6, 10, 11, 12, 13, 20,
                32, 21, 22, 26, 28, 156, 45, 36,
                48, 49, 50, 26, 14, 15, 45, 52,
                48, 51, 50, 26, 30, 31, 45, 52,
                48, 49, 50, 58, 59, 59, 61, 52,
                16, 50, 50, 50, 49, 50, 50, 52,
                64, 65, 66, 67, 67, 65, 65, 68
              ],
        "id_t": [
                  183, 183, 183, 183, 183, 77, 110, 79, 
                  183, 183, 183, 183, 183, 183, 183, 95, 
                  183, 183, 183, 183, 183, 183, 183, 95, 
                  183, 183, 34, 183, 183, 183, 183, 130, 
                  183, 55, 57, 183, 183, 183, 183, 183, 
                  183, 71, 73, 183, 183, 183, 183, 183, 
                  183, 183, 228, 183, 183, 183, 114, 183, 
                  183, 183, 183, 183, 183, 183, 183, 183
                ]
      },     
      blocklyConfig: [],
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
      console.log(responseJson.mapInitState.board);
      console.log(responseJson.mapResource);
      console.log(responseJson.blocklyConfig);
      mainControl.load(responseJson.mapInitState);
      // blockly is generated here
      window.genBlockly(responseJson.blocklyConfig);
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
    console.log("code game content render");
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-6'>
          <Scene mapResource={this.state.mapResource}/>
        </div>
        <div className='col-xs-12 col-md-6 col-md-offset-6'>
          <Programming ref="prog_ref" id="programming" blocklyConfig={this.state.blocklyConfig} onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default CodeGameContent;