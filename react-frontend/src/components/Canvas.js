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
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer
    const stage = new Container();

    let gameScene, id, charactor1, charactor2;

    const gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`

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

      const backgroundArray = [
        0, 1, 2, 3, 4, 7, 8, 9,
        16, 50, 50, 50, 20, 23, 24, 25,
        32, 50, 50, 50, 36, 23, 24, 25,
        48, 49, 50, 51, 52, 23, 24, 25,
        64, 65, 66, 67, 68, 39, 40, 41,
        7, 8, 8, 8, 8, 8, 8, 9,
        23, 24, 24, 24, 24, 24, 24, 25,
        39, 40, 40, 40, 40, 40, 40, 41
      ]

      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++) {
          const background = new Sprite(id[`${backgroundArray[i*row+j]}.png`])
          background.x = j * width / row;
          background.y = i * height / col;
          background.width = width / row;
          background.height = height / col;
          gameScene.addChild(background);
        }
      // background = new Sprite(id['background']);
      // background.width = width;
      // background.height = height;
      // gameScene.addChild(background);

      charactor1 = new Sprite(id['105.png']);
      charactor2 = new Sprite(id['89.png']);
      charactor1.width = width / 10;
      charactor1.height = height / 8;
      charactor2.width = width / 10;
      charactor2.height = height / 8;
      charactor1.x = convertX(4);
      charactor1.y = convertY(4);
      charactor2.x = charactor1.x;
      charactor2.y = charactor1.y - charactor2.height;
      gameScene.addChild(charactor1);
      gameScene.addChild(charactor2);

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
        const px = convertX(player.character.pos['y']),
              py = convertY(player.character.pos['x']);
        if (px !== charactor1.x || py !== charactor1.y) {
          if (px > charactor1.x) charactor1.x++;
          else if (px < charactor1.x) charactor1.x--;
          else if (py > charactor1.y) charactor1.y++, charactor2.y++;
          else if (py < charactor1.y) charactor1.y--, charactor2.y--;
        }
        else {
          player.nextStep();
        }
      }
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
