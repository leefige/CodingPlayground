import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'
import BlocklyPad from './ProgramItem/BlocklyPad'
import Interpreter from './JSInterpreter/interpreter'
require('./JSInterpreter/behavior.js')

class Programming extends Component {

  constructor() {
    super()
    this.state = {
      header: "li = []; function go() {li.push(1);} function turn_left() {li.push(2);} function turn_right() {li.push(3);} function myFunc() {",
      footer: " return li.join(',');} myFunc();"
    }
  }

  // initBehavior() {
  //   var beh = 
  //   this.head = beh
  // }
  
  parseCode(code) {
    //parse code to actionlist
    console.log(code)
    var myInterpreter = new Interpreter(this.state.header+code+this.state.footer)
    myInterpreter.run()
    // alert(myInterpreter.value)
    var result = myInterpreter.value  //a string
    var list = result.split(",")
    console.log("js result: "+list)
    return list
    // return [1, 1]
  }

  handleCodeSubmit(code) {
    console.log("in handleCodeSubmit: "+code)
    const actionList = this.parseCode(code)
    this.props.onCodeSubmit(actionList)//回调函数，由父类实现
  }

  render() {
    return (
      <div className='programming'>
        <div className='container'>
          <div>
            <TaskGuide />
          </div>
          <div>
            <BlocklyPad 
            onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Programming