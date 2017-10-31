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

  handleXmlChange(newXml) {
    console.log("xml change: ", newXml);
    const patt = /<block/;
    let tmp = newXml;
    let num = 0;
    let st = tmp.search(patt);
    while (st >= 0) {
      num++;
      tmp = tmp.substring(st + 1, tmp.length - 1);
      st = tmp.search(patt);
    }
    document.getElementById('show_count').innerHTML="您已使用" + num + "块";
    document.getElementById('solution_cnt').value=num;
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
            <BlocklyPad ref='blockly_pad' 
              onCodeSubmit={this.handleCodeSubmit.bind(this)} 
              blocklyConfig={this.props.blocklyConfig}
              xmlDidChange={this.handleXmlChange.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Programming;