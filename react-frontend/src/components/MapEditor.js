import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../logic/MainControl';

import character from './img/charactor-up.jpg';

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
    this.width = 800, this.height = 600;
    const width = this.width, height = this.height;
    
    const innerWidth = 500, innerHeight = 500;
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

    // create the root of the scene graph
    this.stage = new Container();
    let stage = this.stage;

    const gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`
    let texture = PIXI.Texture.fromImage(character);

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(gpJson)
      .load(setup);
    
    function setup() {
      const gameScene = new Container();
      stage.addChild(gameScene);
      const id = resources[gpJson].textures
      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++) {
          const background = new Sprite(id[`${i*row+j}.png`])
          background.x = j * innerWidth / row + (width - innerWidth) / 2;
          background.y = i * innerHeight / col + (height - innerHeight) / 2;
          background.width = innerWidth / row;
          background.height = innerHeight / col;
          gameScene.addChild(background);
        }
      
      // create a texture from an image path
      for (let i = 0; i < 5; i++) {
        createObj(50, Math.floor(height / 5) * i + 50);
      }
      for (let i = 0; i < 5; i++) {
        createObj(Math.floor(width - 50), Math.floor(height / 5 * i + 50));
      }
    }

    function createObj(x, y) {
      // create our little obj friend..
      let obj = new Sprite(texture);
      // enable the obj to be interactive... this will allow it to respond to mouse and touch events
      obj.interactive = true;
      // this button mode will mean the hand cursor appears when you roll over the obj with your mouse
      obj.buttonMode = true;
      // center the obj's anchor point
      obj.anchor.set(0.5);
      // make it a bit bigger, so it's easier to grab
      obj.scale.set(0.05);
      // setup events
      obj
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
      // move the sprite to its designated position
      obj.position.x = x;
      obj.position.y = y;
      // add it to the stage
      stage.addChild(obj);
    }

    requestAnimationFrame(animate);

    function animate() {
      requestAnimationFrame(animate);

      // render the stage
      renderer.render(stage);
    }

    function onDragStart(event) {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
    }

    function onDragEnd() {
      this.alpha = 1;

      this.dragging = false;

      let newPosition = this.data.getLocalPosition(this.parent);

      const maxWidth = width - this.width / 2;
      const maxHeight = height - this.height / 2;
      const minWidth = this.width / 2;
      const minHeight = this.height / 2;

      newPosition.x = newPosition.x > maxWidth ? maxWidth : newPosition.x;
      newPosition.x = newPosition.x < minWidth ? minWidth : newPosition.x;
      newPosition.y = newPosition.y > maxHeight ? maxHeight : newPosition.y;
      newPosition.y = newPosition.y < minHeight ? minHeight : newPosition.y;


      const leftx = (width - innerWidth) / 2;
      const lefty = (height - innerHeight) / 2;
      const rightx = leftx + innerWidth;
      const righty = rightx + innerHeight;

      const szx = innerWidth / row;
      const szy = innerHeight / col;

      if (leftx < newPosition.x && newPosition.x < rightx && lefty < newPosition.y && newPosition.y < righty) {
        const i = parseInt((newPosition.x - leftx) / szx);
        const j = parseInt((newPosition.y - lefty) / szy);
        newPosition.x = leftx + i * innerWidth / row + szx / 2;
        newPosition.y = lefty + j * innerHeight / col + szy / 2;
      }

      this.position.x = newPosition.x;
      this.position.y = newPosition.y;

      // set the interaction data to null
      this.data = null;
    }

    function onDragMove() {
      if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);

        const maxWidth = width - this.width / 2;
        const maxHeight = height - this.height / 2;
        const minWidth = this.width / 2;
        const minHeight = this.height / 2;

        newPosition.x = newPosition.x > maxWidth ? maxWidth : newPosition.x;
        newPosition.x = newPosition.x < minWidth ? minWidth : newPosition.x;
        newPosition.y = newPosition.y > maxHeight ? maxHeight : newPosition.y;
        newPosition.y = newPosition.y < minHeight ? minHeight : newPosition.y;
  
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
      }
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
