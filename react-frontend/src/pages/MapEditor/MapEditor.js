import React, { Component } from 'react';
import * as PIXI from "pixi.js";
import PropTypes from 'prop-types';

import { mainControl } from '../../logic/MainControl';
import { post } from '../../utils/Request'

import character from './img/pic.jpg';

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

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  /**
  * In this case, componentDidMount is used to grab the canvas container ref, and
  * and hook up the PixiJS renderer
  **/
  componentDidMount(props) {
    this.aspectRatio = 0.7;
    const accWidth = this.self.parentNode.clientWidth - 30;
    this.width = accWidth;
    this.height = this.width * this.aspectRatio;
    const width = this.width, height = this.height;
    

    window.addEventListener('resize', () => {
      const accWidth = this.self.parentNode.clientWidth - 30; 
      const zoomLevel = accWidth / this.width;
      this.stage.scale.x = zoomLevel;
      this.stage.scale.y = zoomLevel;
      this.renderer.resize(accWidth, accWidth * this.aspectRatio);
      requestAnimationFrame(animate);
    })
    
    const innerWidth = 0.45 * width;
    const innerHeight = innerWidth;
    const row = 8, col = 8;

    //Setup PIXI Canvas in componentDidMount
    this.renderer = PIXI.autoDetectRenderer(width, height);
    const renderer = this.renderer;
    this.self.appendChild(renderer.view);

    let state;

    const Container = PIXI.Container,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

    // create the root of the scene graph
    this.stage = new Container();
    let stage = this.stage;
    this.stage.scale.x = 1;
    this.stage.scale.y = 1;

    const gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`;
    const mapJson = `${process.env.PUBLIC_URL}/img/map/map.json`;
    const objJson = `${process.env.PUBLIC_URL}/img/obj/obj.json`
    let texture = PIXI.Texture.fromImage(character);
    let gameScene;

    //Use Pixi's built-in `loader` object to load an image
    loader
      .add(mapJson)
      .add(gpJson)
      .add(objJson)
      .load(setup);
    
    function setup() {
      gameScene = new Container();
      stage.addChild(gameScene);

      const id = resources[mapJson].textures;
      let i = 0;
      for (let key in id) {
        console.log(key);
        let map = new Sprite(id[key]);
        map.width = width / 10;
        map.height = map.width;
        map.position.x = i * 0.13 * width + 0.25 * width;
        map.position.y = 10;
        map.on('click', () => {loadmap(parseInt(key.split('.')[0]))});
        map.interactive = true;
        map.buttonMode = true;
        stage.addChild(map);
        i++;
      }
      
      createObj('cha.png', 0.06 * width, 0.06 * height);
      createObj('1.png', 0.06 * width, Math.floor(height / 5) * 1 + 0.06 * width)

      // create a texture from an image path
      for (let i = 2; i < 5; i++) {
        createObj('5.png', 0.06 * width, Math.floor(height / 5) * i + 0.06 * width);
      }
      for (let i = 0; i < 5; i++) {
        createObj('3.png', Math.floor(width - 0.06 * width), Math.floor(height / 5 * i + 0.06 * width));
      }
    }

    function createObj(str, x, y) {
      const id = resources[objJson].textures; 
      // create our little obj friend..
      let obj = new Sprite(id[str]);
      // enable the obj to be interactive... this will allow it to respond to mouse and touch events
      obj.interactive = true;
      // this button mode will mean the hand cursor appears when you roll over the obj with your mouse
      obj.buttonMode = true;
      // center the obj's anchor point
      obj.anchor.set(0.5);
      // make it a bit bigger, so it's easier to grab
      obj.scale.set(0.05 * (width / obj.width));
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

    function loadmap(mapId) {
        // 获取地图信息和blockly配置
      post('/map/getId', {
        id: mapId,
      })	
      .then((responseJson) => {
        const mapResource = responseJson.mapResource;
        const mapId = mapResource['id'];
        
        gameScene.removeChildren();
        const id = resources[gpJson].textures;
        for (let i = 0; i < row; i++)
          for (let j = 0; j < col; j++) {
            const background = new Sprite(id[`${mapId[i*row+j]}.png`])
            background.x = j * innerWidth / row + (width - innerWidth) / 2;
            background.y = i * innerHeight / col + (height - innerHeight) / 2;
            background.width = innerWidth / row;
            background.height = innerHeight / col;
            gameScene.addChild(background);
          }
        requestAnimationFrame(animate);
      });
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
      <div
        className="game-canvas-container"
        ref={val => { this.self = val; }}
      >
      </div>
    );
  }
}
