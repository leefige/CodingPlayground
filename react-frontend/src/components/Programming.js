import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'
import BlocklyPad from './ProgramItem/BlocklyPad'

class Programming extends Component {
  render() {
    return (
      <div className='programming'>
        <div>
          <TaskGuide />
        </div>
        <div>
          <BlocklyPad />
        </div>
      </div>
    )
  }
}

export default Programming