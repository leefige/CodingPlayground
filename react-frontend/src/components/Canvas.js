import React, { Component } from 'react';
import * as PIXI from "pixi.js"
import PropTypes from 'prop-types';

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
    const width = 500, height = 500;

    //Setup PIXI Canvas in componentDidMount
    var renderer = PIXI.autoDetectRenderer(width, height);
    this.refs.gameCanvas.appendChild(renderer.view);

    var state;

    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer 
    var stage = new Container();

    var gameScene, id, background, charactor;

    const gpJson = `${process.env.PUBLIC_URL}/img/gamePic.json`

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(gpJson)
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {

      gameScene = new Container();
      stage.addChild(gameScene);

      console.log('resources: ', resources)
      id = resources[gpJson].textures;

      console.log('id: ', resources[gpJson]);

      background = new Sprite(id['background']);
      background.width = width;
      background.height = height;
      gameScene.addChild(background);

      charactor = new Sprite(id['charactor']);
      charactor.width = width / 10;
      charactor.height = height / 8;
      charactor.x = 10;
      charactor.y = 10;
      gameScene.addChild(charactor);

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
      charactor.x += 1;
      if (charactor.x > 196) state = end;
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