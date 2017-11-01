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
        
        <div className='text-right blockly-btn-group'>
          <button type="button" id="abort_btn"
            className="btn btn-danger blockly-btn"
            onClick={this.props.onReset}>
            <span className="glyphicon glyphicon-stop"></span>
              &nbsp;&nbsp;终止
            </button>
          <button type="button" id="step_btn"
            className="btn btn-warning blockly-btn"
            onClick = {this.handleStepThrough.bind(this)}>
            <span className="glyphicon glyphicon-step-forward"></span>
              &nbsp;&nbsp;单步调试
          </button>
          <button type="button" id="run_btn"
            className="btn btn-success blockly-btn"
            onClick = {this.handleCodeSubmit.bind(this)}>
            <span className="glyphicon glyphicon-play"></span>
              &nbsp;&nbsp;生成并运行
          </button>
        </div>
      </div>
    );
  }
}

export default BlocklyPad;

