import React, { Component } from 'react';
import TaskGuide from './TaskGuide';
import BlocklyPad from './BlocklyPad';
import Interpreter from 'react-js-interpreter-private';

class Programming extends Component {

  static defaultProps = {
    HEADER: "initLoop(); function goForward() {emitAction(1);} function turnLeft() {emitAction(2);} function turnRight() {emitAction(3);} function attack() {emitAction(4);}" + 
            "function use(obj) {switch (obj) {case 'torch':emitAction(5);break;case 'bomb':emitAction(6);break;default:break;}}\n",
    INFINITE_LOOP_ERROR: "Infinite loop!",
    MAX_LOOP: 100000,
    task: "任务目标：用Blockly生成代码并运行，将主角移动至目标地点",
    std_blockly_num: 5,
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

  emitAction(action) {
    this.handleNextStep(action);
  }
  
  highlightBlock(id) {
    this.refs.blockly_pad.highlightBlock(id);
    this.highlightPause = true;
  }

  initLoop() {
    this.loopTrap = this.props.MAX_LOOP;
  }

  countLoop() {
    if (--this.loopTrap === 0) {
      throw this.props.INFINITE_LOOP_ERROR;
    }
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

    // Add an API function for highlighting blocks.
    wrapper = function(id) {
      id = id ? id.toString() : '';
      return interpreter.createPrimitive(this.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // Add an API function for initialize loopTrap.
    wrapper = function() {
      return interpreter.createPrimitive(this.initLoop());
    };
    interpreter.setProperty(scope, 'initLoop',
        interpreter.createNativeFunction(wrapper.bind(this)));

    // Add an API function for infinite loop.
    wrapper = function() {
      return interpreter.createPrimitive(this.countLoop());
    };
    interpreter.setProperty(scope, 'countLoop',
        interpreter.createNativeFunction(wrapper.bind(this)));
  }

  //parse code to run
  runCode(code) {
    const finalCode = this.props.HEADER + code;
    try{
      this.myInterpreter = new Interpreter(finalCode, this.initInterpreterApi.bind(this));
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

  handleInfiniteLoop() {
    alert("您的代码包含循环次数过多，或产生了无限循环！");
  }

  handleFinishAnimation() {
    document.getElementById("step_btn").disabled = false;
  }

  handleStepThrough(code) {
    // disable step button
    document.getElementById("step_btn").disabled = true;

    this.setState({
      text: '单步调试中...',
    });

    if (!this.myInterpreter) {
      const finalCode = this.props.HEADER + code;
      this.myInterpreter = new Interpreter(finalCode, this.initInterpreterApi.bind(this));
      this.props.startStepThrough();  // call back function
      this.props.setCallback(this.handleFinishAnimation.bind(this));
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
        }
      }
    } while (hasMoreCode && !this.highlightPause);
    return;
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

  handleNextStep(action) {
    const actionList = [];
    actionList.push(action);
    this.props.onNextStep(actionList);
  }

  handleReset() {
    this.props.onReset();
    this.myInterpreter = null;
    this.highlightBlock(null);
    this.setState({
      code: '',
      text: '已终止',
    });
    document.getElementById("step_btn").disabled = false;
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
    num <= this.props.std_blockly_num ? 'cnt-color-norm' :
      num <= 2 * this.props.std_blockly_num ? 'cnt-color-large' : 'cnt-color-huge';
    this.props.onSolutionChanged(newXml, num);
  }

  render() {
    return (
      <div className='programming'>
        <TaskGuide task={this.props.task} />
        <div id="show_count" className='show-count'>
          <span>您已使用 </span>
          <span id='user_count' className='cnt-color-norm'>0</span>
          <span> 个程序块，标准程序需要{this.props.std_blockly_num}块 ~</span>
        </div>
        <BlocklyPad ref='blockly_pad'
          blocklyConfig={this.props.blocklyConfig}
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