import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'
import BlocklyPad from './ProgramItem/BlocklyPad'

class Programming extends Component {
  constructor() {
    super()
    this.code = ""//也可以设置为state，看你怎么用了
  }
  
  parseCode() {
    //parse code to actionlist  
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