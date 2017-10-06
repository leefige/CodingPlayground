import React, { Component } from 'react'
import Game from './Game'

class Scene extends Component {
  render() {
    return (
          <div className='scene'>
            <Game />
          </div>
    )
  }
}

export default Scene