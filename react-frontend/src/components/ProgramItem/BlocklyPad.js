import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactBlockly from '../ReactBlockly/ReactBlockly';

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
    console.log("workspace is: ", this.getWorkspace());
  }

  getWorkspace() {
    return this.refs.blockly_workspace.getWorkspace();
  }

  runFromTextarea() {
    const codeGenerated = this.genCode();
    this.props.onCodeSubmit(codeGenerated); //回调函数，由父类实现
  }

  render() {
    return (
      <div>
        <ReactBlockly ref="blockly_workspace"/>
        <div id="show_count">您已使用0块</div> 
        
        <div className='text-right'>
          <span className='text-right'>
            <button type="submit" 
              className="btn btn-outline-primary">
              单步调试
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
        <div>
          <textarea id='code_textarea' className='code-input'
            disabled="disabled"
            value={this.state.code}
            onChange={this.handleCodeChange.bind(this)} />
        </div>
        
        {/* <div id="blockly" className='pad' data-blocklyconfig = {JSON.stringify(this.props.blocklyConfig)}/> */}

      </div>
    );
  }
}

export default BlocklyPad;

