import * as PIXI from "pixi.js";

import {
  convertId
} from './misc';

export default class Obj {
  constructor(sprite, width, height, posx, posy, phase = null, visible = true) {
    this.obj = new PIXI.Sprite(sprite);
    this.obj.width = width;
    this.obj.height = height;
    this.obj.x = posx;
    this.obj.y = posy;
    this.obj.visible = visible;
    this.phase = phase;
  }

  addTo(stage) {
    stage.addChild(this.obj);
  }
}

export class Button extends Obj {
  constructor(sprite, width, height, posx, posy, phase = null, visible = true) {
    super(sprite, width, height, posx, posy, phase, visible);
    this.obj.interactive = true;
    this.obj.buttonMode = true;
  }
}

export class Dragable extends Obj {
  constructor(responseJson, type, width, height, posx, posy, wWidth, wHeight, innerWidth, innerHeight, row, col, bg) {
    const objJson = `${process.env.PUBLIC_URL}/img/obj/obj.json`;
    const id = PIXI.loader.resources[objJson].textures;
    super(id[`${type}.png`], width, height, posx, posy, null, true);
    this.type = type;
    this.obj.interactive = true;
    this.obj.buttonMode = true;
    this.obj.anchor.set(0.5);
    this.obj
      // events for drag start
      .on('mousedown', this.onDragStart)
      .on('touchstart', this.onDragStart)
      // events for drag end
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      // events for drag move
      .on('mousemove', this.onDragMove)
      .on('touchmove', this.onDragMove);

    this.responseJson = responseJson;
    this.width = wWidth;
    this.height = wHeight;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.row = row;
    this.col = col;
    this.bg = bg;
  }

  onDragStart = (event) => {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.obj.alpha = 0.5;
    this.obj.dragging = true;
    const newPosition = this.data.getLocalPosition(this.obj.parent);

    const {
      width, height,
      innerWidth, innerHeight,
      row, col
    } = this;

    const leftx = (width - innerWidth) / 2;
    const lefty = (height - innerHeight) / 2;
    const szx = innerWidth / row;
    const szy = innerHeight / col;
    const i = parseInt((newPosition.x - leftx) / szx, 10);
    const j = parseInt((newPosition.y - lefty) / szy, 10);
    if (i > 0 && j > 0 && i < row && j < col) {
      this.responseJson.mapInitState.board.map[j][i] = 0;
      this.responseJson.mapResource.id_t[j * row + i] = convertId("blank");
    }
  }

  onDragEnd = () => {
    this.obj.alpha = 1;

    this.obj.dragging = false;

    const {
      width, height,
      innerWidth, innerHeight,
      row, col
    } = this;

    const newPosition = this.data.getLocalPosition(this.obj.parent);

    const maxWidth = width - this.obj.width / 2;
    const maxHeight = height - this.obj.height / 2;
    const minWidth = this.obj.width / 2;
    const minHeight = this.obj.height / 2;

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
      const i = parseInt((newPosition.x - leftx) / szx, 10);
      const j = parseInt((newPosition.y - lefty) / szy, 10);
      newPosition.x = leftx + i * innerWidth / row + szx / 2;
      newPosition.y = lefty + j * innerHeight / col + szy / 2;
      if (this.type === "cha") {
        this.bg[j * row + i].obj.visible = false;
        this.responseJson.mapInitState.character.pos.x = j;
        this.responseJson.mapInitState.character.pos.y = i;
      }
      else if (this.type === "chest") {
        this.bg[j * row + i].obj.visible = false;
        this.responseJson.mapInitState.board.map[j][i] = 90;
      }
      else {
        this.bg[j * row + i].obj.visible = false;
        this.responseJson.mapResource.id_t[j * row + i] = convertId(this.type);
      }
    }

    this.obj.position.x = newPosition.x;
    this.obj.position.y = newPosition.y;

    // set the interaction data to null
    this.data = null;
  }

  onDragMove = () => {
    if (this.obj.dragging) {
      const newPosition = this.data.getLocalPosition(this.obj.parent);

      const maxWidth = this.width - this.obj.width / 2;
      const maxHeight = this.height - this.obj.height / 2;
      const minWidth = this.obj.width / 2;
      const minHeight = this.obj.height / 2;

      newPosition.x = newPosition.x > maxWidth ? maxWidth : newPosition.x;
      newPosition.x = newPosition.x < minWidth ? minWidth : newPosition.x;
      newPosition.y = newPosition.y > maxHeight ? maxHeight : newPosition.y;
      newPosition.y = newPosition.y < minHeight ? minHeight : newPosition.y;

      this.obj.position.x = newPosition.x;
      this.obj.position.y = newPosition.y;
    }
  }
}
