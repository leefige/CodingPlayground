import React, { Component } from 'react';

import {
  convertX,
  convertY,
  canvasSetup,
  updatePhase
} from './utils/misc';

import PixiComponent from './utils/pixi';

export default class GamePanel extends Component {

  componentDidMount(props) {
    canvasSetup.call(this);

    new PixiComponent(
      this.stage,
      this.props.mapResource,
      this.FPS,
      this.width,
      this.height,
      this.renderer
    );
  }
  /**
  * Render our container that will store our PixiJS game canvas. Store the ref
  **/
  render() {
    return (
      <div className="game-canvas-container"
        ref={val => { this.self = val; }}
      >
      </div>
    );
  }
}
