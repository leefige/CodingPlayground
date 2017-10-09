import React, { Component } from 'react'

class BlocklyPad extends Component {

  // following funcs can only be used in text version
  
  constructor() {
    super()
    this.state = {
      code: ''
    }
  }

  handleCodeChange(event) {
    this.setState({
      code: event.target.value
    })
  }

  // following funcs can also be used in blockly version

  genCode() {
    // generate code from blockly
    // currently just use original code
    return this.state.code;
  }

  handleCodeSubmit() {
    const codeGenerated = this.genCode(this.code)
    this.props.onCodeSubmit(codeGenerated)//回调函数，由父类实现
  }

  render() {
    return (
      <div>
        <div>输入代码</div>
        <div>
          <textarea 
            value={this.state.code}
            onChange={this.handleCodeChange.bind(this)} />
        </div>

        <div className='text-right'>
          <button type="submit" 
            className="btn btn-outline-primary" 
            onClick = {this.handleCodeSubmit.bind(this)}>
            运行
          </button>
        </div>
      </div>

    )
  }
}

export default BlocklyPad

