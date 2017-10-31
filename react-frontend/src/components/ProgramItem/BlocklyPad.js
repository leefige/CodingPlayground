import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactBlockly, { Blockly } from '../ReactBlockly/ReactBlockly';

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

  getWorkspace() {
    return this.refs.blockly_workspace.getWorkspace();
  }

  generateCode() {
    // infinite loop setting
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    // for highlight block
    // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    // Blockly.JavaScript.addReservedWords('highlightBlock');
    // generate code
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }

  handleCodeSubmit() {
    console.log("workspace is: ", this.getWorkspace());
    // document.getElementById('gen_code').click();
    // const mycode = document.getElementById('code_textarea').value;
    const mycode = this.generateCode();
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
        <ReactBlockly ref="blockly_workspace"
          xmlDidChange={this.props.xmlDidChange.bind(this)}/>
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

