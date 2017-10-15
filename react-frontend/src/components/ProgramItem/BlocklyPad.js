import React, { Component } from 'react'
// import ReactBlocklyComponent from 'react-blockly-component'

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
    console.log("value: ", document.getElementById('code_textarea').value)
  }

  // following funcs can also be used in blockly version

  genCode() {
    // generate code from blockly
    // currently just use original code
    return this.state.code;
  }

  handleCodeSubmit() {
    const codeGenerated = this.genCode()
    document.getElementById('gen_code').click()
    var mycode = document.getElementById('code_textarea').value
    this.setState({
      code: mycode
    })
    this.props.onCodeSubmit(mycode)//回调函数，由父类实现
    console.log("codeGen: "+mycode)
  }

  render() {
    return (
      <div>
        <div>输入代码</div>
        <div>
          <textarea id='code_textarea' className='code_input'
            value={this.state.code}
            onChange={this.handleCodeChange.bind(this)} />
        </div>

        <div id='parse_code' className='text-right'>
          
        </div>

        <div className='text-right'>
          <button type="submit" 
            className="btn btn-outline-primary" 
            onClick = {this.handleCodeSubmit.bind(this)}>
            运行
          </button>
        </div>

        <div id="blockly" className='pad'>
        </div>
      </div>

    )
  }
}

export default BlocklyPad

