import React, { Component } from 'react';
import * as PIXI from "pixi.js"
import PropTypes from 'prop-types';

import charactor_up from './img/charactor-up.jpg';

export default class Canvas extends Component {

  /**
  * Define our prop types
  **/
  static propTypes = {
    zoomLevel: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  /**
  * In this case, componentDidMount is used to grab the canvas container ref, and 
  * and hook up the PixiJS renderer
  **/
  componentDidMount() {
    //Setup PIXI Canvas in componentDidMount
    var renderer = PIXI.autoDetectRenderer(256, 256);
    this.refs.gameCanvas.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();

    // renderer.autoResize = true;
    // renderer.resize(window.innerWidth * 0.5, window.innerWidth * 0.5);

    //Use Pixi's built-in `loader` object to load an image
    PIXI.loader
      .add(charactor_up)
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {

      //Create the `cat` sprite from the texture
      var cat = new PIXI.Sprite(
        PIXI.loader.resources[charactor_up].texture
      );

      //Add the cat to the stage
      stage.addChild(cat);

      //Render the stage   
      renderer.render(stage);
    }

    // stage.addChild(sprite);

    // //Tell the `renderer` to `render` the `stage`
    // this.renderer.render(stage);
  }
  /**
  * Render our container that will store our PixiJS game canvas. Store the ref
  **/
  render() {
    return (
      <div className="game-canvas-container" ref="gameCanvas">
      </div>
    );
  }
}