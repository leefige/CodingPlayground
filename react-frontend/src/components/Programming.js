import React, { Component } from 'react'

import TaskGuide from './ProgramItem/TaskGuide'

class Programming extends Component {
  render() {
    return (
      <div className='programming'>
        <div>
          <TaskGuide />
        </div>
        <span>Programming</span>
      </div>
    )
  }
}

export default Programming