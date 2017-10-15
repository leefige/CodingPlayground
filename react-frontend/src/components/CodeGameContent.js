import React, { Component } from 'react'
import Scene from './Scene'
import Programming from './Programming'
import Canvas from './Canvas'

class CodeGameContent extends Component {
  constructor() {
    super()
    this.state = {
      actionList: [],
    }
  }

  handleCodeSubmit(_actionList) {
    console.log("handleCodeSubmit")
    this.setState({
      actionList: _actionList,
    })
  }

  handleActionFinish() {
    this.setState({
      actionList: []
    })
  }

  render() {
    return (
      //<div className='code-game-content'>
      <div>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <Scene actionList={this.state.actionList} onActionFinish={this.handleActionFinish.bind(this)}/>
          </div>
          <div className='col-xs-12 col-md-6 col-md-offset-6'>
            <Programming onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
          </div>
        </div>
        <Canvas zoomLevel={1.0}/>
      </div>
    )
  }
}

export default CodeGameContent