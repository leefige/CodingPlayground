import React, { Component } from 'react';
import Scene from './Scene';
import Programming from './programLayout/Programming';
import { mainControl } from '../logic/MainControl';
import { post } from '../utils/Request'

class CodeGameContent extends Component {
  constructor(props) {
    super(props);
    
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
      blocklyConfig: {},
      didFetchMap: false,
      // 待解决：recordData要不要作为state刷新子部件？
      userSolution: "",
      userBlocklyCount: 0
    };
  }

  componentWillMount() {
    // 获取地图信息和blockly配置
    post('/map/getId', {
			id: this.props.match.params.mapID,
		})	
    .then((responseJson) => {
      // console.log("load map sucess");
      // console.log(responseJson.mapInitState.board);
      // console.log(responseJson.mapResource);
      // console.log(responseJson.blocklyConfig);
      mainControl.load(responseJson.mapInitState);
      this.setState({
        mapInitState: responseJson.mapInitState,
        mapResource: responseJson.mapResource,
        blocklyConfig: responseJson.blocklyConfig,
        didFetchMap: true,
      });
      
    })
    .catch((error) => {
      console.error(error);
    });
    // 获取播放记录
    if (this.props.match.params.recordID) {
      post('/record/getId', {
        id: this.props.match.params.mapID,
      })    
      .then((responseJson) => {
        // console.log("load record sucess");
        const player = mainControl.player;
        player.load(responseJson.recordData);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  updateUserSolution(newXml, num) {
    this.setState({
      userSolution: newXml,
      userBlocklyCount: num,
    });
  }

  handleCodeSubmit() {
    mainControl.restart(this.state.mapInitState);
  }

  nextStep(_actionList) {
    // console.log("action list: ", _actionList);
    this.setState({
      actionList: _actionList,
    });
    mainControl.addActionList(_actionList);
  }
  
  handleReset() {
    mainControl.reset(this.state.mapInitState);
  }

  setPlayerCallback(callback) {
    mainControl.player.setCallback(callback);
  }

  StepThroughInit() {
    mainControl.stepThrough(this.state.mapInitState);
  }


  render() {
    // console.log("code game content render");
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-5 col-md-offset-1'>
          {this.state.didFetchMap?
            <Scene mapResource={this.state.mapResource}/>
            :<div></div>
          }
        </div>
        <div className='col-xs-12 col-md-5'>
          {this.state.didFetchMap?
            <Programming ref="prog_ref" id="programming" 
<<<<<<< HEAD
            blocklyConfig={this.state.blocklyConfig} 
            onCodeSubmit={this.handleCodeSubmit.bind(this)}
            onReset={this.handleReset.bind(this)}
            onSolutionChanged={this.updateUserSolution.bind(this)}
            onNextStep={this.nextStep.bind(this)}
            setCallback={this.setPlayerCallback}
            startStepThrough={this.StepThroughInit.bind(this)}
            />
=======
              blocklyConfig={this.state.blocklyConfig} 
              onCodeSubmit={this.handleCodeSubmit.bind(this)}
              onReset={this.handleReset.bind(this)}
              onSolutionChanged={this.updateUserSolution.bind(this)}
              onNextStep={this.nextStep.bind(this)}
              setCallback={this.setCallback.bind(this)}
              startStepThrough={this.startStepThrough.bind(this)}/>
>>>>>>> #96 Disable step button when stepping code and enable it after animation finished.
            :<div></div>
          }
        </div>
        <button onClick={this.mockFinish.bind(this)} >点这里！！</button>
      </div>
    );
  }
}

export default CodeGameContent;