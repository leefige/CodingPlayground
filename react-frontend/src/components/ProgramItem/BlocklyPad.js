import React, { Component } from 'react';
// import ReactBlocklyComponent from 'react-blockly-component'

class BlocklyPad extends Component {

  // following funcs can only be used in text version
  
  constructor() {
    super();
    this.state = {
      code: ''
    };
  }

  handleCodeChange(event) {
    this.setState({
      code: event.target.value
    });
  }

  // following funcs can also be used in blockly version

  genCode() {
    // generate code from blockly
    // currently just use original code
    return this.state.code;
  }

  handleCodeSubmit() {
    document.getElementById('gen_code').click();
    const mycode = document.getElementById('code_textarea').value;
    this.setState({
      code: mycode
    });
    this.props.onCodeSubmit(mycode);  //回调函数，由父类实现
  }

  runFromTextarea() {
    const codeGenerated = this.genCode();
    this.props.onCodeSubmit(codeGenerated); //回调函数，由父类实现
  }

  render() {
    return (
      <div>
        <div>输入代码</div>
        <div>
          <textarea id='code_textarea' className='code-input'
            value={this.state.code}
            onChange={this.handleCodeChange.bind(this)} />
        </div>

          <div id='parse_code' className='text-right'>
          </div>

          <div className='text-right'>
            <span className='text-right'>
              <button type="submit" 
                className="btn btn-outline-primary" 
                onClick = {this.runFromTextarea.bind(this)}>
                运行文本
              </button>
            </span>

            <span className='text-right'>
              <button type="submit" 
                className="btn btn-outline-primary" 
                onClick = {this.handleCodeSubmit.bind(this)}>
                生成并运行
              </button>
            </span>
          </div>

        <div id="blockly" className='pad'>
        </div>
      </div>
    );
  }
}

export default BlocklyPad;

