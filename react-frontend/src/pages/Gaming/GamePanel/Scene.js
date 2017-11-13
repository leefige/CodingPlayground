import React, { Component } from 'react'
import GamePanel from './GamePanel'

class Scene extends Component {

  render() {
    return (
          <div className='scene'>
            <GamePanel mapResource={this.props.mapResource}/>
          </div>
    )
  }
}

export default Scene
