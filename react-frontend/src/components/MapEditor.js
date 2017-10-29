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

    // create the root of the scene graph
    this.stage = new Container();
    let stage = this.stage;

    // create a texture from an image path
    let texture = PIXI.Texture.fromImage(character);

    for (let i = 0; i < 10; i++) {
      createBunny(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    }

    function createBunny(x, y) {
      // create our little bunny friend..
      let bunny = new Sprite(texture);

      // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
      bunny.interactive = true;

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      bunny.buttonMode = true;

      // center the bunny's anchor point
      bunny.anchor.set(0.5);

      // make it a bit bigger, so it's easier to grab
      bunny.scale.set(0.1);

      // setup events
      bunny
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
      bunny.position.x = x;
      bunny.position.y = y;

      // add it to the stage
      stage.addChild(bunny);
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

      // set the interaction data to null
      this.data = null;
    }

    function onDragMove() {
      if (this.dragging) {
        let newPosition = this.data.getLocalPosition(this.parent);
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
