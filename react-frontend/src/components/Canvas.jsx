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
    var cat, state;

    //Use Pixi's built-in `loader` object to load an image
    PIXI.loader
      .add(charactor_up)
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {

      //Create the `cat` sprite from the texture
      cat = new PIXI.Sprite(
        PIXI.loader.resources[charactor_up].texture
      );

      cat.x = 96;
      cat.y = 96;

      cat.width = 100;
      cat.height = 100;

      //Add the cat to the stage
      stage.addChild(cat);
      
      state = play;

      //Render the stage   
      gameLoop();
    }

    function gameLoop() {
      requestAnimationFrame(gameLoop);
      state();
      renderer.render(stage);
    }

    function play() {
      cat.x += 1;
      if (cat.x > 196) state = end;
    }

    function end() {

    }
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