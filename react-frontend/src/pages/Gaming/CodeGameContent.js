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
      stdBlockNum: 5,       // fetch from backend
      savedSolution: "",    // fetch from backend
      userSolution: "",     // upload to backend when succeed
      userBlocklyCount: 0
    };
  }

  componentWillMount() {
    // TODO: 用一个请求同时获取地图和用户解法，避免异步问题

    // 获取地图信息和blockly配置和用户解法
    post('/map/getId', {
      id: this.props.match.params.mapID,
      userId: this.props.userType === "game" ? this.props.getLoginUserId() : this.props.match.params.shareUserID,
		})
    .then((responseJson) => {
      mainControl.load(responseJson.mapInitState);
      this.setState({
        mapInitState: responseJson.mapInitState,
        mapResource: responseJson.mapResource,
        blocklyConfig: responseJson.blocklyConfig,
        // TODO:
        stdBlockNum: responseJson.stdBlockNum || 5,
        savedSolution: responseJson.savedSolution || '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="08RrVFGh7Vd6kRq}mp$]">i</variable></variables><block type="controls_for" id="H7oSz,,1hk]3/OS!=4h^" x="16" y="124"><field name="VAR" id="08RrVFGh7Vd6kRq}mp$]" variabletype="">i</field><value name="FROM"><shadow type="math_number" id="(;*U0)NkbjzX8NVD2g:?"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number" id="X.JaW(ygNj@x%hOssFbn"><field name="NUM">3</field></shadow></value><value name="BY"><shadow type="math_number" id="6Lw*,xc9jW%PKZJ3qJ0!"><field name="NUM">1</field></shadow></value><statement name="DO"><block type="actions_go" id="1Nap5j;e.L47Gqd5gfjg"><next><block type="actions_turn" id="77^+iQnejgOKgz`z4DMA"><field name="DIRECTION">LEFT</field><next><block type="actions_use" id="@/Ls+sqZIqy)Q)s.qS}G"><value name="OBJECT"><block type="objects_bomb" id="9NcR_]TVWvZ?1+9_O}Z-"></block></value></block></next></block></next></block></statement></block></xml>',
        didFetchMap: true,
      });
    })
    .catch((error) => {
      console.error(error);
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
    mainControl.restart(this.state.mapInitState);
  }

  handleSuccess() {
    // TODO: send solution to backend
    // console.log("success, send solution to backend");
  }

  nextStep(_actionList) {
    mainControl.addActionList(_actionList);
  }

  handleReset() {
    mainControl.reset(this.state.mapInitState);
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
    // if ((this.props.getIsLogin() && this.props.userType === "game") || this.props.userType === "share") {
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
                  onSuccess={this.handleSuccess.bind(this)}
                />
                :<div></div>
              }
            </div>
            <button className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
	开始演示模态框
</button>
            <Result mapID={this.props.match.params.mapID} userID={this.props.match.params.shareUserID} score={3 // TODO: change 3 to api from blockly
            } />
        </div>
      );
    // }
    // else {
    //   return (
    //     <Redirect push to="/login" />
    //   );
    // }
  }
}

export default CodeGameContent;
