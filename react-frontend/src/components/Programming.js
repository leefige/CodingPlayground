import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'
import BlocklyPad from './ProgramItem/BlocklyPad'
import Interpreter from './JSInterpreter/interpreter'
require('./JSInterpreter/behavior.js')

class Programming extends Component {
  static defaultProps = {
    header: "li = []; function go() {li.push(1);} function turn_left() {li.push(2);} function turn_right() {li.push(3);} function myFunc() {",
    footer: " return li.join(',');} myFunc();"
  }

  parseCode(code) {
    //parse code to actionlist
    console.log(code)
    try{
      var myInterpreter = new Interpreter(this.props.header+code+this.props.footer)
      myInterpreter.run()
      var result = myInterpreter.value  //a string
      var list = result.split(",")
      console.log("js result: "+list)
      return list
    }
    catch (err) {
      alert('Invalid input!')
      console.log("err: "+err)
      return []
    }
  }

  handleCodeSubmit(code) {
    console.log("in handleCodeSubmit: "+code)
    const actionList = this.parseCode(code)
    this.props.onCodeSubmit(actionList)
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