import React, { Component } from 'react'
import Scene from './Scene'
import Programming from './Programming'

class CodeGameContent extends Component {
  constructor() {
    super()
    this.state = {
      actionList:"actionList"
    }
  }
  handleCodeSubmit(actionList) {
    this.setState({
      actionList: "actionList"
    })
  }
  render() {
    return (
      //<div className='code-game-content'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <Scene actionList = {this.state.actionList}/>
          </div>
          <div className='col-xs-12 col-md-6 col-md-offset-6'>
            <Programming onCodeSubmit={this.handleCodeSubmit.bind(this)}/>
          </div>
        </div>
    )
  }
}

export default CodeGameContent