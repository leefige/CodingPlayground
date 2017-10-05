import React, { Component } from 'react'
import Scene from './Scene'
import Programming from './Programming'

class CodeGameContent extends Component {
  render() {
    return (
      //<div className='code-game-content'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <Scene />
          </div>
          <div className='col-xs-12 col-md-6 col-md-offset-6'>
            <Programming />
          </div>
        </div>
    )
  }
}

export default CodeGameContent