import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactBlockly, { Blockly } from '../ReactBlockly/ReactBlockly';

class BlocklyPad extends Component {

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
    // console.log("workspace is: ", this.getWorkspace());
    const mycode = this.generateCode();
    this.props.onCodeSubmit(mycode);  //回调函数，由父类实现
  }

  render() {
    return (
      <div>
        <ReactBlockly ref="blockly_workspace"
          blocklyConfig={this.props.blocklyConfig}
          onXmlChange={this.props.onXmlChange.bind(this)}/>
        
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
        {/* <div id="blockly" className='pad' data-blocklyconfig = {JSON.stringify(this.props.blocklyConfig)}/> */}

      </div>
    );
  }
}

export default BlocklyPad;

