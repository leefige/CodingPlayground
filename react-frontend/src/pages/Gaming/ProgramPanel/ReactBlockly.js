import React, { Component } from 'react';

class ReactBlockly extends Component {

  static defaultProps = {
    Blockly: window.Blockly
  };

  constructor() {
    super();
    this.state = {
      workspace: {},
      xml: "",
    };
  }

  // inject Blockly when did mount
  componentDidMount() {
    const myWorkspace = this.props.Blockly.inject('blockly_div', {
      toolbox: this.props.blocklyConfig.toolboxCategories,
      // toolbox: document.getElementById('toolbox'),
      media: '/media/',
      readOnly: this.props.userType === "share",
      grid: {
        spacing: 40,
        length: 3,
        colour: '#ddd',
        snap: false
      },
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.5,
        scaleSpeed: 1.2
      },
      trashcan: true,
    });

    this.setState({
      workspace: myWorkspace
    });

    /** To avoid updating conflict caused by unsync receiption of json */

    const initialXml = Blockly.Xml.textToDom(this.props.initialXml);
    // // const initialXml = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="08RrVFGh7Vd6kRq}mp$]">i</variable></variables><block type="controls_for" id="H7oSz,,1hk]3/OS!=4h^" x="16" y="124"><field name="VAR" id="08RrVFGh7Vd6kRq}mp$]" variabletype="">i</field><value name="FROM"><shadow type="math_number" id="(;*U0)NkbjzX8NVD2g:?"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number" id="X.JaW(ygNj@x%hOssFbn"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number" id="6Lw*,xc9jW%PKZJ3qJ0!"><field name="NUM">1</field></shadow></value><statement name="DO"><block type="actions_go" id="1Nap5j;e.L47Gqd5gfjg"><next><block type="actions_turn" id="77^+iQnejgOKgz`z4DMA"><field name="DIRECTION">LEFT</field><next><block type="actions_use" id="@/Ls+sqZIqy)Q)s.qS}G"><value name="OBJECT"><block type="objects_bomb" id="9NcR_]TVWvZ?1+9_O}Z-"></block></value></block></next></block></next></block></statement></block></xml>');
    Blockly.Xml.domToWorkspace(initialXml, myWorkspace);

    myWorkspace.addChangeListener(this.debounce(function () {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
      if (newXml === this.state.xml) {
        return;
      }
      this.setState({ xml: newXml }, this.onXmlChange);
    }.bind(this), 200));
  }

  updateBlocklyXml(newXml) {
    const newXmlDom = Blockly.Xml.textToDom(newXml);
    // const initialXml = Blockly.Xml.textToDom('<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="08RrVFGh7Vd6kRq}mp$]">i</variable></variables><block type="controls_for" id="H7oSz,,1hk]3/OS!=4h^" x="16" y="124"><field name="VAR" id="08RrVFGh7Vd6kRq}mp$]" variabletype="">i</field><value name="FROM"><shadow type="math_number" id="(;*U0)NkbjzX8NVD2g:?"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number" id="X.JaW(ygNj@x%hOssFbn"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number" id="6Lw*,xc9jW%PKZJ3qJ0!"><field name="NUM">1</field></shadow></value><statement name="DO"><block type="actions_go" id="1Nap5j;e.L47Gqd5gfjg"><next><block type="actions_turn" id="77^+iQnejgOKgz`z4DMA"><field name="DIRECTION">LEFT</field><next><block type="actions_use" id="@/Ls+sqZIqy)Q)s.qS}G"><value name="OBJECT"><block type="objects_bomb" id="9NcR_]TVWvZ?1+9_O}Z-"></block></value></block></next></block></next></block></statement></block></xml>');
    Blockly.Xml.domToWorkspace(newXmlDom, this.getWorkspace());
  }

  getWorkspace() {
    return this.state.workspace;
  }

  debounce(func, wait) {
    let timeout;
    return function () {
      let context = this,
          args = arguments;
      let later = function later() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  onXmlChange() {
    this.props.onXmlChange(this.state.xml);
  }

  highlightBlock(id) {
    this.state.workspace.highlightBlock(id);
  }

  render() {
    return ( 
      <div id='blockly_div' className={this.props.wrapperClassname} ></div>
    );
  }
}

export const Blockly = window.Blockly;

export default ReactBlockly;
