import React, { Component } from 'react';

class ReactBlockly extends Component {

  constructor() {
    super();
    this.state = {
      workspace: {}
    };
  }

  static defaultProps = {
    Blockly: window.Blockly
  };

  // inject Blockly when did mount
  componentDidMount() {
    const myWorkspace = this.props.Blockly.inject('blockly_div', {
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
      trashcan: true
    });
    console.log("react blockly did mount");
    this.setState({
      workspace: myWorkspace
    });
  }

  getWorkspace() {
    return this.state.workspace;
  }

  render() {
    return ( 
      <div id='blockly_div' className='blockly-div' ></div>
    );
  }
}

export default ReactBlockly;