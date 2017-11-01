import React, { Component } from 'react';
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

  highlightBlock(id) {
    this.refs.blockly_workspace.highlightBlock(id);
  }

  render() {
    return (
      <div>
        <ReactBlockly ref="blockly_workspace"
          blocklyConfig={this.props.blocklyConfig}
          onXmlChange={this.props.onXmlChange.bind(this)} />

        <div className='text-right' style={{ margin: 15 }}>
          <button type="button"
            className="btn btn-danger"
            style={{ marginRight: 15 }}
            onClick={this.props.onReset}>
            <span className="glyphicon glyphicon-stop"></span>
            &nbsp;终止
            </button>
          <button type="button"
            className="btn btn-info"
            style={{ marginRight: 15 }}>
            <span className="glyphicon glyphicon-pause"></span>
            &nbsp;暂停
            </button>
          <button type="button"
            className="btn btn-warning"
            style={{ marginRight: 15 }}>
            <span className="glyphicon glyphicon-step-forward"></span>
            &nbsp;单步调试
            </button>
          <button type="button"
            className="btn btn-success"
            style={{ marginRight: 15 }}
            onClick={this.handleCodeSubmit.bind(this)}>
            <span className="glyphicon glyphicon-play"></span>
            &nbsp;生成并运行
          </button>
        </div>
      </div>
    );
  }
}

export default BlocklyPad;

