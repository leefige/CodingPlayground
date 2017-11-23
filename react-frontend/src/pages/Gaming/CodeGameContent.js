import React, { Component } from 'react';
import Scene from './GamePanel/Scene';
import Result from './Result';
import Programming from './ProgramPanel/Programming';
import { mainControl } from '../../logic/MainControl';
import { post } from '../../utils/Request';
import { Redirect } from 'react-router-dom';


class CodeGameContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curMapID: this.props.match.params.mapID,
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
      stdBlockNum: 5,       // fetch from backend
      savedSolution: "",    // fetch from backend
      userSolution: "",     // upload to backend when succeed
      userBlocklyCount: 0,
      gameScore: 0,
      showResultModal: false,
    };
  }

  componentWillMount() {
    // TODO: 用一个请求同时获取地图和用户解法，避免异步问题
    // 获取地图信息和blockly配置和用户解法
    post('/api/v1/map/getId', {
      id: this.props.match.params.mapID,
      userId: (this.props.userType === "game" ? this.props.getLoginUserId : this.props.match.params.shareUserID),
		})
    .then((responseJson) => {
      // console.log("map res, ", responseJson);
      mainControl.load(responseJson.mapInitState);
      this.setState({
        mapInitState: responseJson.mapInitState,
        mapResource: responseJson.mapResource,
        blocklyConfig: responseJson.blocklyConfig,
        stdBlockNum: responseJson.stdBlockNum || 5,
        savedSolution: responseJson.savedSolution || '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="08RrVFGh7Vd6kRq}mp$]">i</variable></variables><block type="actions_go" id="1Nap5j;e.L47Gqd5gfjg" x="74" y="77"></block></xml>',
        didFetchMap: true,
      });
    })
    .catch((error) => {
      // console.error(error);
    });
  }

  updateUserSolution(newXml, num) {
    this.setState({
      userSolution: newXml,
      userBlocklyCount: num,
    });
  }

  updateBlocklyXml(newXml) {
    this.refs.program_area.updateBlocklyXml(newXml);
  }

  handleCodeSubmit() {
    this.setState({
      showResultModal: false,
      gameScore: 0,
    })
    mainControl.restart(this.state.mapInitState);
  }

  handleResult(result) {
    let score = 0;
    if (result) {
      if (this.state.userBlocklyCount <= this.state.stdBlockNum)
        score = 3;
      else if (this.state.userBlocklyCount <= 2 * this.state.stdBlockNum)
        score = 2;
      else
        score = 1;
    }
    this.setState({
      showResultModal: true,
      gameScore: score,
    })
    if (result && this.props.userType === "game") {
      this.sendUserSolution();
    }
    this.refs.show_btn.click();
  }

  async sendUserSolution() {
    let isSystemMap = false;
    if (this.state.curMapID >= 301 && this.state.curMapID <= 310) {
      isSystemMap = true;
    }
    let curLevel = -1;
    if (isSystemMap) {
      curLevel = this.state.curMapID - 300;
    }
    post('/api/v1/map/updateBlockly', {
      userid: this.props.getLoginUserId,
      mapid: this.props.match.params.mapID,
      blockly: this.state.userSolution,
      curLevel: curLevel,
    }).then((responseJson) => {
    }).catch((error) => {
      // console.error(error);
    });
  }

  nextStep(_actionList) {
    mainControl.addActionList(_actionList);
  }

  handleReset() {
    this.setState({
      showResultModal: false,
      gameScore: 0,
    })
    mainControl.reset(this.state.mapInitState);
  }

  handleResultModalClose() {
    this.setState({
      showResultModal: false,
    })
  }

  setPlayerCallback(callback) {
    mainControl.player.setCallback(callback);
  }

  setPlayerGameOverCallback(callback) {
    mainControl.player.setGameOverCallback(callback);
  }

  StepThroughInit() {
    mainControl.stepThrough(this.state.mapInitState);
  }

  render() {
    if (this.props.userType === "game") {
      let isSystemMap = false;
      if (this.state.curMapID >= 301 && this.state.curMapID <= 310) {
        isSystemMap = true;
      }
      if (isSystemMap) {
        const curLevel = this.state.curMapID - 300;
        if (curLevel > this.props.topLevel || (this.props.vip === false && curLevel > 5)) {
          return (
            <Redirect push to={"/index"}/>
          );
        }
      }
    }
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
              <Programming ref="program_area" id="programming"
                userType={this.props.userType}
                blocklyConfig={this.state.blocklyConfig}
                initSolution={this.state.savedSolution}
                stdBlockNum={this.state.stdBlockNum}
                onCodeSubmit={this.handleCodeSubmit.bind(this)}
                onReset={this.handleReset.bind(this)}
                onSolutionChanged={this.updateUserSolution.bind(this)}
                onNextStep={this.nextStep.bind(this)}
                setCallback={this.setPlayerCallback}
                setGameOverCallback={this.setPlayerGameOverCallback}
                startStepThrough={this.StepThroughInit.bind(this)}
                onGetResult={this.handleResult.bind(this)}
              />
              :<div></div>
            }
          </div>
          <button ref="show_btn" className="btn btn-primary btn-lg hide" data-toggle="modal" data-target="#resultModal"/>
          <Result ref="show_result" userType={this.props.userType} mapID={this.props.match.params.mapID} shareUserID={this.props.userType === "game" ? this.props.getLoginUserId : this.props.match.params.shareUserID} score={this.state.gameScore}/>
      </div>
    );
  }
}

export default CodeGameContent;
