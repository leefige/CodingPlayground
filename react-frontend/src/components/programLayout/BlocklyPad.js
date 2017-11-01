import React, { Component } from 'react';
import ReactBlockly, { Blockly } from './reactBlockly/ReactBlockly';

class BlocklyPad extends Component {

  getWorkspace() {
    return this.refs.blockly_workspace.getWorkspace();
  }

  generateCode() {
    // infinite loop setting
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    // for highlight block
    Blockly.JavaScript.STATEMENT_PREFIX = null;
    Blockly.JavaScript.addReservedWords('highlightBlock');

    // generate code
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }

  generateCodeWithHighlight() {
    // infinite loop setting
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    // for highlight block
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');

    // generate code
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }


  handleCodeSubmit() {
    const mycode = this.generateCode();
    this.props.onCodeSubmit(mycode);
  }

  handleStepThrough() {
    const mycode = this.generateCodeWithHighlight();
    this.props.onStepThrough(mycode);
  }

  highlightBlock(id) {
    this.refs.blockly_workspace.highlightBlock(id);
  }

  render() {
    return (
      <div>
        <ReactBlockly ref="blockly_workspace"
          blocklyConfig={this.props.blocklyConfig}
          onXmlChange={this.props.onXmlChange.bind(this)}/>
        
        <div className='text-right'>
          <button type="submit" 
            className="btn btn-primary"
            style={{marginRight:15}}
            onClick = {this.handleStepThrough.bind(this)}>
            单步调试
          </button>
          <button type="submit" 
            className="btn btn-primary"
            style={{marginRight:15}}
            onClick = {this.handleCodeSubmit.bind(this)}>
            生成并运行
          </button>
        </div>
      </div>
    );
  }
}

export default BlocklyPad;

