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
      // TODO: use config to setup toolbox
      toolbox: document.getElementById('toolbox'),
      media: '/media/',
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

    myWorkspace.addChangeListener(this.debounce(function () {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));
      if (newXml == this.state.xml) {
        return;
      }
      this.setState({ xml: newXml }, this.xmlDidChange);
    }.bind(this), 200));

    this.setState({
      workspace: myWorkspace
    });
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

  xmlDidChange() {
    // TODO
    this.props.xmlDidChange(this.state.xml);
  }

  render() {
    return ( 
      <div id='blockly_div' className='blockly-div' ></div>
    );
  }
}

export const Blockly = window.Blockly;

export default ReactBlockly;
