import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../../../logic/MainControl';

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
    // this.width = window.innerWidth / 2.5;
    this.width = this.self.parentNode.clientWidth;
    this.aspectRatio = 1;
    this.height = this.width * this.aspectRatio;
    const FPS = 7;

    window.addEventListener('resize', () => {
      const zoomLevel = this.self.parentNode.clientWidth / this.width;
      this.stage.scale.x = zoomLevel;
      this.stage.scale.y = zoomLevel;
      this.renderer.resize(this.self.parentNode.clientWidth, this.self.parentNode.clientWidth * this.aspectRatio);
      this.renderer.render(stage);
    })

    const width = this.width, height = this.height;
    const row = this.props.mapResource['width'], col = this.props.mapResource['height'];

    const mapId = this.props.mapResource['id'];
    const mapIdt = this.props.mapResource['id_t'];

    //Setup PIXI Canvas in componentDidMount
    this.renderer = PIXI.autoDetectRenderer(width, height);
    const renderer = this.renderer;
    this.self.appendChild(renderer.view);

    let state;

    const Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    //Create a Pixi stage and renderer
    this.stage = new Container();
    const stage = this.stage;

    let gameScene, id, chaId, gameover;

    let mCharacter, mPhase;

    const gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`
    const chaJson = `${process.env.PUBLIC_URL}/img/character/character.json`

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(gpJson)
      .add(chaJson)
      .load(setup);

    function convertX(x) {
      return parseInt(x * width / row + 6);
    }

    function convertY(x) {
      return parseInt(x * height / col - height / col / 2);
    }

    function updatePhase(x) {
      x = parseInt(x);
      if (x === 3) return 1;
      return x;
    }

    //This `setup` function will run when the image has loaded
    function setup() {

      gameScene = new Container();
      stage.addChild(gameScene);

      id = resources[gpJson].textures;

      const backgroundArray = mapId;
      const transparentArray = mapIdt;

      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++) {
          const background = new Sprite(id[`${backgroundArray[i*row+j]}.png`])
          background.x = j * width / row;
          background.y = i * height / col;
          background.width = width / row;
          background.height = height / col;
          gameScene.addChild(background);
          const trans = new Sprite(id[`${transparentArray[i*row+j]}.png`])
          trans.x = j * width / row;
          trans.y = i * height / col;
          trans.width = width / row;
          trans.height = height / col;
          gameScene.addChild(trans);
        }
      // background = new Sprite(id['background']);
      // background.width = width;
      // background.height = height;
      // gameScene.addChild(background);

      chaId = resources[chaJson].textures;

      const baseDir = mainControl.player.character.dir;
      mPhase = 1 * FPS; 
      mCharacter = new Sprite(chaId[`${10 + baseDir * 10 + updatePhase(mPhase / FPS)}.png`]);

      mCharacter.width = width / 10;
      mCharacter.height = height / 8;
      mCharacter.x = convertX(mainControl.player.character.pos['y']);
      mCharacter.y = convertY(mainControl.player.character.pos['x']);
      gameScene.addChild(mCharacter);

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
      const baseDir = player.character.dir;

      if (status === 0) {
        const px = convertX(player.character.pos['y']),
              py = convertY(player.character.pos['x']);
        mCharacter.x = px, mCharacter.y = py;
        player.nextStep();
      }
      if (status === 1) {
        const px = convertX(player.character.pos['y']),
              py = convertY(player.character.pos['x']);
        if (px !== mCharacter.x || py !== mCharacter.y) {
          if (px > mCharacter.x) mCharacter.x++;
          else if (px < mCharacter.x) mCharacter.x--;
          else if (py > mCharacter.y) mCharacter.y++;
          else if (py < mCharacter.y) mCharacter.y--;
          mCharacter.texture = chaId[`${10 + baseDir * 10 + updatePhase(mPhase / FPS)}.png`];
          mPhase = (mPhase + 1) % (4 * FPS);
          console.log(mPhase);
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
        state = play;
        gameover.x = width;
        gameover.y = height;
        return;
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
      <div className="game-canvas-container"
        ref={val => { this.self = val; }}
      >
      </div>
    );
  }
}
