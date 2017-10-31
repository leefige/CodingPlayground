import React, { Component } from 'react';
import TaskGuide from './ProgramItem/TaskGuide';
import BlocklyPad from './ProgramItem/BlocklyPad';
import Interpreter from 'react-js-interpreter-private';

class Programming extends Component {

  constructor() {
    super();
    this.state = {
      code: '',
    };
  }

  static defaultProps = {
    header: "li = []; function go() {li.push(1);} function turn_left() {li.push(2);} function turn_right() {li.push(3);} function myFunc() {",
    footer: " return li.join(',');} myFunc();"
  };

  initInterpreterApi(interpreter, scope) {
    // Add an API function for highlighting blocks.
    var wrapper = function (id) {
      id = id ? id.toString() : '';
      return interpreter.createPrimitive(this.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));
  }

  //parse code to actionlist
  parseCode(code) {
    const finalCode = this.props.header + code + this.props.footer;
    // console.log("finalCode: "+finalCode);
    try {
      let myInterpreter = new Interpreter(finalCode, this.initInterpreterApi);
      myInterpreter.run();
      const result = myInterpreter.value;  //a string
      const list = result.split(",");
      return list;
    }
    catch (err) {
      alert(err);
      return [];
    }
  }

  handleCodeSubmit(code) {
    this.setState({
      code: code,
    });
    const actionList = this.parseCode(code);
    this.props.onCodeSubmit(actionList);
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
  }

  render() {
    return (
      <div className='programming'>
        <TaskGuide />
        <div id="show_count">您已使用0块</div>
        <BlocklyPad ref='blockly_pad'
          blocklyConfig={this.props.blocklyConfig}
          onCodeSubmit={this.handleCodeSubmit.bind(this)}
          onXmlChange={this.handleXmlChange.bind(this)}
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