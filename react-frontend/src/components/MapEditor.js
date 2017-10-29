import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../logic/MainControl';

export default class MapEditor extends Component {

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
    const row = 8, col = 8;

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

    let gameScene, id;

    const gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(gpJson)
      .load(setup);

    //This `setup` function will run when the image has loaded
    function setup() {

      gameScene = new Container();
      stage.addChild(gameScene);

      id = resources[gpJson].textures;

      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++) {
          const background = new Sprite(id[`${i*row+j}.png`])
          background.x = j * width / row;
          background.y = i * height / col;
          background.width = width / row;
          background.height = height / col;
          gameScene.addChild(background);
        }

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
