import React, { Component } from 'react'
import Game from './Game'
import Canvas from './Canvas'

class Scene extends Component {
  render() {
    return (
          <div className='scene'>
            <Canvas zoomLevel={1.0}/>
            <Game actionList={this.props.actionList} onActionFinish={this.props.onActionFinish.bind(this)}/>
          </div>
    )
  }
}

export default Scene