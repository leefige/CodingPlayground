import React, { Component } from 'react';

class TaskGuide extends Component {
  render() {
    return ( 
      <div className = 'task-guide' >
        <span className="task-point"/>
        <span> {this.props.task} </span> 
      </div>
    );
  }
}

export default TaskGuide;