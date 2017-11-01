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
      media: '/media/',
      readOnly: false,
      grid: {
        spacing: 30,
        length: 3,
        colour: '#ccc',
        snap: true
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

    const initialXml = Blockly.Xml.textToDom(this.props.blocklyConfig.initialXml);
    Blockly.Xml.domToWorkspace(initialXml, myWorkspace);

    myWorkspace.addChangeListener(this.debounce(function () {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
      if (newXml == this.state.xml) {
        return;
      }
      this.setState({ xml: newXml }, this.onXmlChange);
    }.bind(this), 200));
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
      <div id='blockly_div' className='blockly-div' ></div>
    );
  }
}

export const Blockly = window.Blockly;

export default ReactBlockly;
