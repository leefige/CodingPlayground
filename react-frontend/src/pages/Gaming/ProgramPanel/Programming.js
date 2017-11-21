import React, { Component } from 'react';
import TaskGuide from './TaskGuide';
import BlocklyPad from './BlocklyPad';
import Interpreter from 'react-js-interpreter-private';
import { mainControl } from '../../../logic/MainControl';
import { actionTable, elements } from '../../../logic/Constant';

class Programming extends Component {

  static defaultProps = {
    HEADER: [
      "initLoop(); ",
      "function goForward() {emitAction(" + actionTable.go + ");} ",
      "function turnLeft() {emitAction(" + actionTable.turnLeft + ");} ",
      "function turnRight() {emitAction(" + actionTable.turnRight + ");} ",
      "function attack() {emitAction(" + actionTable.attack + ");} ",
      "function use(obj) {switch (obj) {case 'TORCH':emitAction(" + actionTable.torch + ");break;case 'BOMB':emitAction(" + actionTable.bomb + ");break;default:break;}} ",
      "function openChest() {emitAction(" + actionTable.open + ");}",
      "function inFrontOf(obj) {return queryMapInfo(obj);} ",
    ],
    INFINITE_LOOP_ERROR: "Infinite loop!",
    MAX_LOOP: 100000,
    task: "任务目标：用Blockly生成代码并运行，将主角移动至目标地点"
  };

  constructor() {
    super();
    this.state = {
      code: '',
      text: '',
    };
    this.myInterpreter = null;
    this.highlightPause = false;
    this.loopTrap = 0;
  }

  /** a new way to parse code:
      wrap an emit(num) method into js interpreter
      then define go(){emit(1);}
      and outside the sandbox, emit(num) will send an action to animation (actionList) */

/*-------connect to mainControl-------*/

  emitAction(action) {
    this.callNextStep(action);
  }

  queryMapInfo(object) {
    // TODO: 调用maincontrol的回调函数
    let target = elements.empty;
    switch(object) {
      case "CHEST":
        target = elements.chest;
        break;
      case "ENEMY":
        target = elements.enemy;
        break;
      case "GRASS":
        target = elements.grass;
        break;
      case "TREE":
        target = elements.tree;
        break;
      case "FENCE":
        target = elements.fence;
        break;
      case "STONE":
        target = elements.stone;
        break;
      case "CLIFF":
        target = elements.precipice;
        break;
      case "POND":
        target = elements.pond;
        break;
      default:
        target = elements.empty;
    }
    const res = mainControl.character.frontIs(target);
    return res;
  }

  callNextStep(action) {
    const actionList = [];
    actionList.push(action);
    this.props.onNextStep(actionList);
  }

/*-------connect to blockly workspace-------*/

  highlightBlock(id) {
    this.refs.blockly_pad.highlightBlock(id);
    this.highlightPause = true;
  }

  updateBlocklyXml(newXml) {
    this.refs.blockly_pad.updateBlocklyXml(newXml);
  }

/*-----------set up interpreter------------*/

  completeCode(code) {
    let finalCode = code;
    this.props.HEADER.forEach(function(element) {
      finalCode = element + finalCode;
    }, this);
    return finalCode;
  }

  initLoop() {
    this.loopTrap = this.props.MAX_LOOP;
  }

  countLoop() {
    if (--this.loopTrap === 0) {
      throw this.props.INFINITE_LOOP_ERROR;
    }
  }

  handleInfiniteLoop() {
    alert("您的代码包含循环次数过多，或产生了无限循环！");
  }

  // init interpreter
  initInterpreterApi(interpreter, scope) {
    // Add an API function for emit action code.
    let wrapper = function(action) {
      action = action ? action.toString() : '';
      return interpreter.createPrimitive(this.emitAction(action));
    };
    interpreter.setProperty(scope, 'emitAction',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // for query map info.
    wrapper = function(object) {
      object = object ? object.toString() : '';
      return interpreter.createPrimitive(this.queryMapInfo(object));
    };
    interpreter.setProperty(scope, 'queryMapInfo',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // for highlighting blocks.
    wrapper = function(id) {
      id = id ? id.toString() : '';
      return interpreter.createPrimitive(this.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // for initialize loopTrap.
    wrapper = function() {
      return interpreter.createPrimitive(this.initLoop());
    };
    interpreter.setProperty(scope, 'initLoop',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // for infinite loop.
    wrapper = function() {
      return interpreter.createPrimitive(this.countLoop());
    };
    interpreter.setProperty(scope, 'countLoop',
        interpreter.createNativeFunction(wrapper.bind(this)));
  }

/*-----------execute user's code------------*/

  //parse code to run
  runCode(code) {
    const finalCode = this.completeCode(code);
    try{
      this.myInterpreter = new Interpreter(finalCode, this.initInterpreterApi.bind(this));
      this.props.setCallback(this.handleFinishAnimation.bind(this));
      this.props.setGameOverCallback(this.handleGameOver.bind(this));
      this.myInterpreter.run();
    } catch (err) {
      if (err === this.props.INFINITE_LOOP_ERROR) {
        this.handleInfiniteLoop();
      } else {
        console.error(err);
      }
    } finally {
      this.myInterpreter = null;
    }
  }

  handleStepThrough(code) {
    // disable step button
    document.getElementById("step_btn").disabled = true;

    this.setState({
      text: '单步调试中...',
    });

    if (!this.myInterpreter) {
      const finalCode = this.completeCode(code);
      this.myInterpreter = new Interpreter(finalCode, this.initInterpreterApi.bind(this));
      this.props.startStepThrough();  // call back function
      this.props.setCallback(this.handleFinishAnimation.bind(this));
      this.props.setGameOverCallback(this.handleGameOver.bind(this));
    }

    this.highlightPause = false;
    let hasMoreCode = false;
    do {
      try {
        hasMoreCode = this.myInterpreter.step();
      } catch (err) {
        console.error(err);
      } finally {
        if (!hasMoreCode) {
          this.setState({
            text: '单步调试结束',
          });
          this.myInterpreter = null;
          this.highlightBlock(null);
          document.getElementById("step_btn").disabled = false;
          document.getElementById("abort_btn").disabled = true;
          document.getElementById("step_btn_text").innerHTML = "&nbsp;&nbsp;单步调试";
          document.getElementById("blockly_layer").style.display = 'none';
        }
      }
    } while (hasMoreCode && !this.highlightPause);
    return;
  }

/*-----------interact with UI------------*/

  handleFinishAnimation() {
    document.getElementById("step_btn").disabled = false;
  }

  handleGameOver(result) {
    document.getElementById("run_btn").disabled = false;
    document.getElementById("step_btn").disabled = false;
    document.getElementById("step_btn_text").innerHTML = "&nbsp;&nbsp;单步调试";
    document.getElementById("blockly_layer").style.display = 'none';
    this.props.onGetResult(result);
  }

  handleCodeSubmit(pureCode, runableCode) {
    this.setState({
      code: runableCode,
      text: pureCode,
    });
    this.highlightBlock(null);
    this.props.onCodeSubmit();
    this.runCode(runableCode);
  }

  handleReset() {
    this.props.onReset();
    this.myInterpreter = null;
    this.highlightBlock(null);
    this.setState({
      code: '',
      text: '已终止',
    });
  }

  handleXmlChange(newXml) {
    const patt = /<block/;
    let tmp = newXml;
    let num = 0;
    let st = tmp.search(patt);
    while (st >= 0) {
      num++;
      tmp = tmp.substring(st + 1, tmp.length - 1);
      st = tmp.search(patt);
    }
    document.getElementById("user_count").innerHTML = num;
    document.getElementById("user_count").className =
    num <= this.props.stdBlockNum ? 'cnt-color-norm' :
      num <= 2 * this.props.stdBlockNum ? 'cnt-color-large' : 'cnt-color-huge';
    this.props.onSolutionChanged(newXml, num);
  }

/*-----------render()------------*/

  render() {
    return (
      <div className='programming'>
        <TaskGuide task={this.props.task} />
        <div id="show_count" className='show-count'>
          <span>您已使用 </span>
          <span id='user_count' className='cnt-color-norm'>0</span>
          <span> 个程序块，标准程序需要{this.props.stdBlockNum}块 ~</span>
        </div>
        <BlocklyPad ref='blockly_pad'
          userType={this.props.userType}
          blocklyConfig={this.props.blocklyConfig}
          initSolution={this.props.initSolution}
          onCodeSubmit={this.handleCodeSubmit.bind(this)}
          onReset={this.handleReset.bind(this)}
          onXmlChange={this.handleXmlChange.bind(this)}
          onStepThrough={this.handleStepThrough.bind(this)}
        />
        <textarea id="code_textarea"
          className='code-text'
          disabled='disabled'
          value={this.state.text}
        />
      </div>
    );
  }
}

export default Programming;
