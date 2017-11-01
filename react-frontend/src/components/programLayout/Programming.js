import React, { Component } from 'react';
import TaskGuide from './TaskGuide';
import BlocklyPad from './BlocklyPad';
import Interpreter from 'react-js-interpreter-private';

class Programming extends Component {

  constructor() {
    super();
    this.state = {
      code: '',
    };
    this.myInterpreter = null;
    this.highlightPause = false;    
  }

  // a new way to parse code:
  // wrap an emit(num) method into js interpreter
  // then define go(){emit(1);}
  // and outside the sandbox, emit(num) will send an action to animation (actionList)

  static defaultProps = {
    header: "function go() {emitAction(1);} function turn_left() {emitAction(2);} function turn_right() {emitAction(3);} ",
  };

  emitAction(action) {
    this.handleNextStep(action);
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
  }

  //parse code to run
  runCode(code) {
    const finalCode = this.props.header + code;
    // console.log("finalCode: "+finalCode);
    try{
      this.myInterpreter = new Interpreter(finalCode, this.initInterpreterApi.bind(this));
      this.myInterpreter.run();
    } catch (err) {
      alert(err);
    } finally {
      this.myInterpreter = null;
    }
  }

  handleFinishAnimation() {
    document.getElementById("step_btn").disabled = false;
  }

  handleStepThrough(code) {
    // disable step button
    document.getElementById("step_btn").disabled = true;

    this.setState({
      code: '单步调试中...',
    });

    if (!this.myInterpreter) {
      const finalCode = this.props.header + code;
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
        alert(err);
      } finally {
        if (!hasMoreCode) {
          this.setState({
            code: '',
          });
          this.myInterpreter = null;
          this.highlightBlock(null);
          document.getElementById("step_btn").disabled = false;
          return;
        }
      }
    } while (hasMoreCode && !this.highlightPause);
    return;
  }

  handleCodeSubmit(code) {
    this.setState({
      code: code,
    });
    this.props.onCodeSubmit();
    this.runCode(code);
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
    });
    document.getElementById("step_btn").disabled = false;
    // alert("Abort!");
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
    document.getElementById('show_count').innerHTML = "您已使用" + num + "块";
    this.props.onSolutionChanged(newXml, num);
  }

  highlightBlock(id) {
    this.refs.blockly_pad.highlightBlock(id);
    this.highlightPause = true;
  }

  render() {
    return (
      <div className='programming'>
        <TaskGuide />
        <div id="show_count">您已使用0块</div>
        <BlocklyPad ref='blockly_pad'
          blocklyConfig={this.props.blocklyConfig}
          onCodeSubmit={this.handleCodeSubmit.bind(this)}
          onReset={this.handleReset.bind(this)}
          onXmlChange={this.handleXmlChange.bind(this)}
          onStepThrough={this.handleStepThrough.bind(this)}
        />
        <textarea id='code_textarea'
          className='code-input'
          disabled="disabled"
          value={this.state.code}
        />
      </div>
    );
  }
}

export default Programming;