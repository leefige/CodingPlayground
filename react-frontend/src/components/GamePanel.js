import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../logic/MainControl';

export default class GamePanel extends Component {

  /**
  * Define our prop types
  **/
  static propTypes = {
    zoomLevel: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.updateZoomLevel = this.updateZoomLevel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.zoomLevel !== this.props.zoomLevel;
  }

  updateZoomLevel(props) {
    this.stage.scale.x = props.zoomLevel;
    this.stage.scale.y = props.zoomLevel;
    this.renderer.resize(this.width * props.zoomLevel, this.height * props.zoomLevel);
  }

  componentWillReceiveProps(nextProps) {
    this.updateZoomLevel(nextProps);
  }

  /**
  * In this case, componentDidMount is used to grab the canvas container ref, and
  * and hook up the PixiJS renderer
  **/
  componentDidMount(props) {
    this.width = 500, this.height = 500;
    const width = this.width, height = this.height;
    const row = this.props.mapResource['width'], col = this.props.mapResource['height'];

    const mapId = this.props.mapResource['id']

    //Setup PIXI Canvas in componentDidMount
    this.renderer = PIXI.autoDetectRenderer(width, height);
    const renderer = this.renderer;
    this.refs.gameCanvas.appendChild(renderer.view);

    let state;

    const Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer
    this.stage = new Container();
    const stage = this.stage;

    let gameScene, id, charactor1, charactor2, gameover;

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

      id = resources[gpJson].textures;

      const backgroundArray = mapId;

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

      gameover = new Sprite(id['gameover.png']);
      gameover.x = width, gameover.y = height;
      gameover.width = width, gameover.y = height;
      gameScene.addChild(gameover);

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
      const status = player.getStatus();
      if (status === 1) {
        const px = convertX(player.character.pos['y']),
              py = convertY(player.character.pos['x']);
        if (px !== charactor1.x || py !== charactor1.y) {
          if (px > charactor1.x) charactor1.x++, charactor2.x++;
          else if (px < charactor1.x) charactor1.x--, charactor2.x--;
          else if (py > charactor1.y) charactor1.y++, charactor2.y++;
          else if (py < charactor1.y) charactor1.y--, charactor2.y--;
        }
        else {
          player.nextStep();
        }
      }
      else if (status === 3) {
        state = end;
      }
    }

    function end() {
      const player = mainControl.player;
      if (player.getStatus() !== 3) {
        state = play();
        gameover.x = width;
        gameover.y = height;
      }
      gameover.x = 0;
      gameover.y = 0;
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
