import React, { Component } from 'react'
import Scene from './Scene'
import Programming from './Programming'

class CodeGameContent extends Component {
  constructor() {
    super()
    this.state = {
      actionList: [1, 2, 1, 3],
    }
  }

  handleCodeSubmit(_actionList) {
    console.log("handleCodeSubmit")
    this.setState({
      actionList: _actionList,
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