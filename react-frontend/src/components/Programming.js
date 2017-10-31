import React, { Component } from 'react';
import TaskGuide from './ProgramItem/TaskGuide';
import BlocklyPad from './ProgramItem/BlocklyPad';
import Interpreter from 'react-js-interpreter-private';

class Programming extends Component {
  static defaultProps = {
    header: "li = []; function go() {li.push(1);} function turn_left() {li.push(2);} function turn_right() {li.push(3);} function myFunc() {",
    footer: " return li.join(',');} myFunc();"
  };

  parseCode(code) {
    //parse code to actionlist
    const finalCode = this.props.header+code+this.props.footer;
    // console.log("finalCode: "+finalCode);
    try{
      let myInterpreter = new Interpreter(finalCode);
      myInterpreter.run();
      const result = myInterpreter.value;  //a string
      const list = result.split(",");
      return list;
    }
    catch (err) {
      alert('Invalid input!');
      return [];
    }
  }

  handleCodeSubmit(code) {
    const actionList = this.parseCode(code);
    this.props.onCodeSubmit(actionList);
  }

  render() {
    console.log(this.props.blocklyConfig)
    return (
      <div className='programming'>
        <div className='container'>
          <div>
            <TaskGuide />
          </div>
          <div>
            <BlocklyPad onCodeSubmit={this.handleCodeSubmit.bind(this)} blocklyConfig = {this.props.blocklyConfig}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Programming;