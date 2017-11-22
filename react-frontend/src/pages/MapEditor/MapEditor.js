import React, { Component } from 'react';

import {
  canvasSetup
} from './utils/misc';

import PixiComponent from './utils/pixi';



export default class MapEditor extends Component {

  // componentWillUnmount() {
  //   window.removeEventListener('resize');
  // }

  /**
  * In this case, componentDidMount is used to grab the canvas container ref, and
  * and hook up the PixiJS renderer
  **/
  componentDidMount(props) {

    if (this.props.match.params.mapID === undefined)
      canvasSetup.call(this);
      new PixiComponent(
        this.stage,
        this.width,
        this.height,
        this.innerWidth,
        this.innerHeight,
        this.renderer
      );
  }

  /**
  * Render our container that will store our PixiJS game canvas. Store the ref
  **/
  render() {
    return (
      <div
        className="game-canvas-container"
        ref={val => { this.self = val; }}
      >
      </div>
    );
  }
}
