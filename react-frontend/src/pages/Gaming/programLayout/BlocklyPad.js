import React, { Component } from 'react';
import ReactBlockly, { Blockly } from './reactBlockly/ReactBlockly';

class BlocklyPad extends Component {

  componentDidMount() {
    document.getElementById("abort_btn").disabled = true;
  }

  getWorkspace() {
    return this.refs.blockly_workspace.getWorkspace();
  }

  generatePureCode() {
    Blockly.JavaScript.STATEMENT_PREFIX = null;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    Blockly.JavaScript.addReservedWords('highlightBlock');
    
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }

  generateCode() {
    // for highlight block
    Blockly.JavaScript.STATEMENT_PREFIX = null;
    Blockly.JavaScript.addReservedWords('highlightBlock');

    // infinite loop setting
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'countLoop();\n';

    // generate code
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }

  generateCodeWithHighlight() {
    // for highlight block
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');

    // generate code
    return Blockly.JavaScript.workspaceToCode(this.getWorkspace());
  }


  handleCodeSubmit() {
    document.getElementById("abort_btn").disabled = false;
    const runableCode = this.generateCode();
    const pureCode = this.generatePureCode();
    this.props.onCodeSubmit(pureCode, runableCode);
  }

  handleStepThrough() {
    document.getElementById("abort_btn").disabled = false;
    const mycode = this.generateCodeWithHighlight();
    this.props.onStepThrough(mycode);
  }

  handleReset() {
    this.props.onReset();
    document.getElementById("abort_btn").disabled = true;
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
            onClick={this.handleReset.bind(this)}>
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

