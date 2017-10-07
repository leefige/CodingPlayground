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

  handleCodeChange(code) {
    //use onCodeChange() in Blockly Pad
    this.code = code
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
          <BlocklyPad />
        </div>
        <div className='text-right'>
          <button type="submit" className="btn btn-outline-primary" onClick = {this.handleCodeSubmit.bind(this)}>
            运行
          </button>
        </div>
      </div>
    )
  }
}

export default Programming