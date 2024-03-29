import React, { Component } from 'react';
import ReactBlockly, { Blockly } from './ReactBlockly';

class BlocklyPad extends Component {

  componentDidMount() {
    document.getElementById("abort_btn").disabled = true;
  }

  getWorkspace() {
    return this.refs.blockly_workspace.getWorkspace();
  }

  updateBlocklyXml(newXml) {
    this.refs.blockly_workspace.updateBlocklyXml(newXml);
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
    if(document.getElementById("run_btn").disabled === true) {
      return;
    }
    document.getElementById("abort_btn").disabled = false;
    document.getElementById("run_btn").disabled = true;
    document.getElementById("step_btn").disabled = true;
    document.getElementById("step_btn_text").innerHTML = "&nbsp;&nbsp;单步调试";
    document.getElementById("blockly_layer").style.display = 'block';
    const runableCode = this.generateCode();
    const pureCode = this.generatePureCode();
    this.props.onCodeSubmit(pureCode, runableCode);
  }

  handleStepThrough() {
    if(document.getElementById("step_btn").disabled === true) {
      return;
    }
    document.getElementById("abort_btn").disabled = false;
    document.getElementById("run_btn").disabled = true;
    document.getElementById("step_btn_text").innerHTML = "&nbsp;&nbsp;执行这一步";
    document.getElementById("blockly_layer").style.display = 'block';
    const mycode = this.generateCodeWithHighlight();
    this.props.onStepThrough(mycode);
  }

  handleReset() {
    if(document.getElementById("abort_btn").disabled === true) {
      return;
    }
    document.getElementById("abort_btn").disabled = true;
    document.getElementById("run_btn").disabled = false;
    document.getElementById("step_btn").disabled = false;
    document.getElementById("step_btn_text").innerHTML = "&nbsp;&nbsp;单步调试";
    document.getElementById("blockly_layer").style.display = 'none';
    this.props.onReset();
  }

  highlightBlock(id) {
    this.refs.blockly_workspace.highlightBlock(id);
  }

  render() {
    return (
      <div>
        <div id="blockly_container">
          <div id="blockly_layer" className='blockly-layer'/>
          <div id="blockly_area" className='blockly-area'>
            <ReactBlockly ref="blockly_workspace"
              wrapperClassname='blockly-div'
              userType={this.props.userType}
              blocklyConfig={this.props.blocklyConfig}
              initialXml={this.props.initSolution}
              onXmlChange={this.props.onXmlChange.bind(this)}/>
          </div>
        </div>
        
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
            <span id="step_btn_text">&nbsp;&nbsp;单步调试</span>
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

