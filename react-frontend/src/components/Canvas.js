import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../logic/MainControl';

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
    const row = 8, col = 8;

    //Setup PIXI Canvas in componentDidMount
    const renderer = PIXI.autoDetectRenderer(width, height);
    this.refs.gameCanvas.appendChild(renderer.view);

    let state;

    const Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer
    const stage = new Container();

    let gameScene, id, background, charactor;

    const gpJson = `${process.env.PUBLIC_URL}/img/gamePic.json`

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(gpJson)
      .load(setup);

    function convertX(x) {
      return parseInt(x * width / row + 6);
    }

    function convertY(x) {
      return parseInt(x * height / col - height / col / 2);
    }

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
      charactor.x = convertX(4);
      charactor.y = convertY(4);
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
      const player = mainControl.player;
      if (player.isPlaying()) {
        const px = convertX(player.character.x),
              py = convertY(player.character.y);
        if (px !== charactor.x || py !== charactor.y) {
          if (px > charactor.x) charactor.x++;
          else if (px < charactor.x) charactor.x--;
          else if (py > charactor.y) charactor.y++;
          else if (py < charactor.y) charactor.y--;
        }
        else {
          player.nextStep();
        }
      }
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
