import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'
import BlocklyPad from './ProgramItem/BlocklyPad'
import Interpreter from './JSInterpreter/interpreter'
require('./JSInterpreter/behavior.js')

class Programming extends Component {
  constructor() {
    super()
    // this.head = ""
    this.code = ""//也可以设置为state，看你怎么用了
    // this.initBehavior()
  }

  // initBehavior() {
  //   var beh = 
  //   this.head = beh
  // }
  
  parseCode(code) {
    //parse code to actionlist
    // console.log(this.head)
    var myInterpreter = new Interpreter("function go() {return 1;} go(); go(); go();");
    myInterpreter.run();
    // alert(myInterpreter.value);
    let st = myInterpreter.value
    return [st]
  }

  handleCodeSubmit() {
    const actionList = this.parseCode(this.code)
    this.props.onCodeSubmit(actionList)//回调函数，由父类实现
  }

  render() {
    return (
      <div className='container'>
        <div>
          <TaskGuide />
        </div>
        <div>
          <BlocklyPad 
          onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Programming